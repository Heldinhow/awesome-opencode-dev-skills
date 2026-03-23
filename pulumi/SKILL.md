---
name: pulumi
description: Use when provisioning cloud infrastructure with Pulumi using TypeScript or Python. Covers AWS, GCP, Azure resources, stacks, state management, and component resources as Infrastructure as Code.
---

# Pulumi

## Setup

```bash
# Install CLI
brew install pulumi

# Login (state backend)
pulumi login            # Pulumi Cloud (free)
pulumi login --local    # local state (file system)
pulumi login s3://my-bucket  # AWS S3 backend

# Create new project
mkdir infra && cd infra
pulumi new aws-typescript    # TypeScript + AWS
pulumi new gcp-typescript    # TypeScript + GCP
pulumi new azure-typescript  # TypeScript + Azure
```

## Project Structure

```
infra/
  Pulumi.yaml          # project config
  Pulumi.dev.yaml      # stack config (dev)
  Pulumi.prod.yaml     # stack config (prod)
  index.ts             # infrastructure code
  package.json
```

## Basic AWS Example

```ts
// index.ts
import * as aws from '@pulumi/aws'
import * as pulumi from '@pulumi/pulumi'

const config = new pulumi.Config()
const env = pulumi.getStack() // "dev" | "prod"

// S3 Bucket
const bucket = new aws.s3.BucketV2('my-bucket', {
  bucket: `my-app-${env}`,
  tags: { Environment: env, ManagedBy: 'pulumi' },
})

// Enable versioning
new aws.s3.BucketVersioningV2('my-bucket-versioning', {
  bucket: bucket.id,
  versioningConfiguration: { status: 'Enabled' },
})

// Lambda function
const role = new aws.iam.Role('lambda-role', {
  assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({ Service: 'lambda.amazonaws.com' }),
})

new aws.iam.RolePolicyAttachment('lambda-basic', {
  role: role.name,
  policyArn: aws.iam.ManagedPolicy.AWSLambdaBasicExecutionRole,
})

const fn = new aws.lambda.Function('my-fn', {
  runtime: aws.lambda.Runtime.NodeJS20dX,
  code: new pulumi.asset.AssetArchive({
    '.': new pulumi.asset.FileArchive('./dist'),
  }),
  handler: 'index.handler',
  role: role.arn,
  environment: {
    variables: {
      NODE_ENV: env,
      DB_URL: config.requireSecret('dbUrl'),
    },
  },
  timeout: 30,
  memorySize: 512,
})

// API Gateway
const api = new aws.apigatewayv2.Api('api', {
  protocolType: 'HTTP',
  corsConfiguration: {
    allowOrigins: ['*'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization'],
  },
})

const integration = new aws.apigatewayv2.Integration('integration', {
  apiId: api.id,
  integrationType: 'AWS_PROXY',
  integrationUri: fn.arn,
  payloadFormatVersion: '2.0',
})

const route = new aws.apigatewayv2.Route('route', {
  apiId: api.id,
  routeKey: '$default',
  target: pulumi.interpolate`integrations/${integration.id}`,
})

new aws.apigatewayv2.Stage('stage', {
  apiId: api.id,
  name: '$default',
  autoDeploy: true,
}, { dependsOn: [route] })

// Allow API Gateway to invoke Lambda
new aws.lambda.Permission('api-invoke', {
  action: 'lambda:InvokeFunction',
  function: fn.name,
  principal: 'apigateway.amazonaws.com',
  sourceArn: pulumi.interpolate`${api.executionArn}/*/*`,
})

// Exports
export const bucketName = bucket.id
export const apiUrl = api.apiEndpoint
export const functionName = fn.name
```

## Stack Config

```bash
# Set config values
pulumi config set aws:region us-east-1
pulumi config set --secret dbUrl postgresql://...

# Pulumi.dev.yaml (auto-generated)
config:
  aws:region: us-east-1
  my-project:environment: dev
```

## Commands

```bash
pulumi up           # preview + deploy
pulumi up --yes     # deploy without confirmation
pulumi preview      # preview changes only
pulumi destroy      # destroy all resources
pulumi stack        # show current stack info
pulumi stack ls     # list stacks
pulumi stack select prod   # switch stack
pulumi stack output apiUrl # print exported value
pulumi logs         # view logs
pulumi refresh      # sync state with real cloud
```

## Component Resource (Reusable)

```ts
import * as pulumi from '@pulumi/pulumi'
import * as aws from '@pulumi/aws'

interface WebAppArgs {
  domain: string
  certificateArn: pulumi.Input<string>
}

class WebApp extends pulumi.ComponentResource {
  public readonly bucketName: pulumi.Output<string>
  public readonly url: pulumi.Output<string>

  constructor(name: string, args: WebAppArgs, opts?: pulumi.ComponentResourceOptions) {
    super('custom:infra:WebApp', name, {}, opts)

    const bucket = new aws.s3.BucketV2(`${name}-bucket`, {
      tags: { Component: name },
    }, { parent: this })

    // ... CloudFront, Route53, etc.

    this.bucketName = bucket.id
    this.url = pulumi.output(`https://${args.domain}`)

    this.registerOutputs({ bucketName: this.bucketName, url: this.url })
  }
}

// Usage
const app = new WebApp('frontend', { domain: 'example.com', certificateArn: cert.arn })
export const appUrl = app.url
```

## RDS + VPC Example

```ts
const vpc = new aws.ec2.Vpc('vpc', { cidrBlock: '10.0.0.0/16' })

const subnetA = new aws.ec2.Subnet('subnet-a', {
  vpcId: vpc.id,
  cidrBlock: '10.0.1.0/24',
  availabilityZone: 'us-east-1a',
})

const db = new aws.rds.Instance('db', {
  engine: 'postgres',
  engineVersion: '16.3',
  instanceClass: 'db.t3.micro',
  allocatedStorage: 20,
  dbName: 'myapp',
  username: 'admin',
  password: config.requireSecret('dbPassword'),
  vpcSecurityGroupIds: [sg.id],
  dbSubnetGroupName: subnetGroup.name,
  skipFinalSnapshot: env !== 'prod',
})

export const dbEndpoint = db.endpoint
```

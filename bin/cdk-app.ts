#!/usr/bin/env node
import cdk = require('@aws-cdk/cdk');
import { CdkAppStack } from '../lib/cdk-app-stack';

const app = new cdk.App();
new CdkAppStack(app, 'CdkAppStack');
app.run();

import cdk = require('@aws-cdk/cdk');
import lambda = require('@aws-cdk/aws-lambda');
import * as express from "express";
import app from '../app';

export class CdkAppStack extends cdk.Stack {
  constructor(parent: cdk.App, name: string, props?: cdk.StackProps) {
    super(parent, name, props);

    // The code that defines your stack goes here

    // get list of decorators
    // create function with generated handler

    handlerFunctions = serveApp(app, this)
  }
}

export var handlerFunctions = {}

export function serveApp(app: express.Express, stack: cdk.Stack) {

  const handlerFunctions: any = {}
  const lambdas: any[] = []
  app._router.stack.forEach((stackItem: any) => {
    if (stackItem.name == "bound dispatch") {

      const routePath = stackItem.route.path.replace("/", ".")

      const handlerFunction = stackItem.handle
      handlerFunctions[routePath] = stackItem.handle

      console.log(handlerFunction)

      const handle = `stack.handlerFunctions.${routePath}`

      console.log(routePath);

      const fn = new lambda.Function(stack, routePath, {
        runtime: lambda.Runtime.NodeJS810,
        handler: handle,
        code: lambda.Code.asset('./stack'),
      });

      lambdas.push(fn)

    }
    
  });

  return handlerFunctions
}
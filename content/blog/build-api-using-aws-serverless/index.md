---
title: "How to Build a Serverless API using AWS lambda, API gateway, and DynamoDB"
date: "2022-09-23"
summary: "Build a Serverless API using AWS lambda, API gateway, and DynamoDB."
description: "A walkthrough for creating a serverless TODO application with the serverless framework, AWS Lambda, and DynamoDB for persistence."
toc: true
readTime: true
autonumber: true
math: true
tags: ["aws", "api", "serverless"]
showTags: false
---


# How to Build a Serverless API using AWS lambda, API gateway, and DynamoDB

### Outline

- Introduction
    - What is serverless
    - How it works
- Prerequisites
- Steps
    - Create an AWS account and setup AWS CLI
        - create an account
        - add a user for CLI and give programmatic access (IAM)
    - Install and setup serverless framework
        - What is a serverless framework
        - Deploy the initial serverless app and test the endpoint
    - Connecting DynamoDB and Creating Lambda Functions
        - Provisioning Database
        - Create the serverless functions for our API
        - Testing our functions
- Conclusion

---

# Introduction

Recently, I was tasked with building a serverless application for an NFT valuation service, this was not my first time working with the serverless framework, and I’ve always enjoyed the process of building serverless applications.

In this tutorial, I show how to create a serverless API, hoping you’d enjoy the process as much as do.

This tutorial walks through creating a serverless TODO application with the serverless framework, AWS Lambda, and DynamoDB for persistence.

### Prerequisites

- Basic understanding of ES6 JavaScipt
- You have Node.js Installed
- An AWS account

### What is Serverless?

Serverless architecture is a pattern of providing backend services on demand without application developers needing to have knowledge or worrying about the underlying servers.

<aside>
💡 Yes, servers are still used, but this time, app developers don't need to worry about upgrading, patching, or maintaining them.

</aside>

To explain further, take the analogy of an automated teller machine (ATM) for example, an ATM machine may have a server running 24/7, and at any time, it's always ready to perform its task.

But if you think again, at night when most people are asleep, the ATM machine servers are still running and still acquiring costs, even though it's not being used.

Now if the machine ran on a serverless architecture, the servers would not need to be up and running always, it'll only become active if action is carried out, for example when a user wants to make withdrawals or transfers,  then the required function `withdraw` or `transfer` will run and that's it, then the server goes back to sleep.

# Building the API

## Step 1 - Creating an AWS account and Setting up AWS CLI

We are going to:

- Create an account on AWS (Amazon Web Services)
- Create an IAM user
- Install and configure the AWS CLI (Command Line Interface)

This is a simple step - if it’s your first time using AWS, I recommend reading through the [Amazon Getting Started](https://aws.amazon.com/getting-started/)

### Create AWS Account

Create an AWS account by going to [https://aws.amazon.com/](https://aws.amazon.com/) and clicking on the Create an AWS  account button at the top right.

![aws sign up.PNG](How%20to%20Build%20a%20Serverless%20API%20using%20AWS%20lambda,%20AP%20e5ed0a4536d84f648e7db8f8b4c904bb/aws_sign_up.png)

<aside>
💡 Please note, you’ll need a credit/debit card to create an account, you’ll not be charged if you follow this tutorial because the task we perform is still within the free tier of AWS.

</aside>

If you plan to experiment further, please ensure to check that you are still within the free tier to avoid being charged.

Now that we are done creating an account, we will be interacting with AWS from the command line on our local computer via the AWS CLI

To make that possible, we need a user credential which we’ll give to AWS CLI to enable it to interact with our AWS account, so we need to create an IAM user account.

### Create AWS IAM User

While logged in to your AWS account, enter “IAM” into the search bar at the top and click on the IAM result

![IAM.PNG](How%20to%20Build%20a%20Serverless%20API%20using%20AWS%20lambda,%20AP%20e5ed0a4536d84f648e7db8f8b4c904bb/IAM.png)

On the IAM screen, click on **Users** and click **Add users** in the resulting screen

We enter any username we want to use, in my case, I entered “**todoapp-dev**”, then click on the checkbox to mark “**Access key - Programmatic access”.** This is important because we will be interacting with our AWS account locally on our computer using the AWS CLI.

![user1.PNG](How%20to%20Build%20a%20Serverless%20API%20using%20AWS%20lambda,%20AP%20e5ed0a4536d84f648e7db8f8b4c904bb/user1.png)

Click “**Next: Permissions**” at the bottom of the screen to proceed to the next step.

On the next screen, click “**Attach existing policies directly**” and mark Check “**AdministratorAccess**” *(Note: this is not recommended, you only want to grant access to the specific AWS services you’d be using)*

After that, Click “**Next: tags**” leave that as it is, click “**Next: Review**” and finally click **Create user**

We are then presented with a screen showing our credentials: **Access key ID** and **Secret access key**.

These are the credentials we’ll use to interact with our account from the AWS CLI, don't lose them. 

You can copy them somewhere or just leave the screen as it is, we’ll come back to it.

### Install and configure the AWS CLI (Command Line Interface)

Now, we need to install the AWS CLI. To install, use the command below

For Linux:

```bash
$ curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
$ unzip awscliv2.zip
$ sudo ./aws/install
```

For windows and macOS you can use the installers below. Download the installer for your platform and run them.

Windows: [https://awscli.amazonaws.com/AWSCLIV2.msi](https://awscli.amazonaws.com/AWSCLIV2.msi)
macOS: [https://awscli.amazonaws.com/AWSCLIV2.pkg](https://awscli.amazonaws.com/AWSCLIV2.pkg)

To confirm that it's installed properly in the command line, issue the command

```bash
$ aws --version
aws-cli/2.7.0 Python/3.9.11 Linux/5.10.16.3-microsoft-standard-WSL2 exe/x86_64.ubuntu.20 prompt/off
```

We should see a result similar to the above. Well done.

Next, we need to configure AWS CLI.

To do so, in the command line enter the command below

```bash
$ aws configure
```

We will be asked for our **AWS Access Key ID**, copy the key gotten from creating an IAM user and paste it there, and press enter, we’ll then be asked for a **secret key**, do the same, but this time copy the hidden secret key.

For the region and any other prompt, we just press enter leaving them at “None” till we are then back to normal CLI prompt.

Congratulations, we have successfully configured our AWS CLI. We continue to the next step.

## Step 2 - Install and Setup Serverless Framework

We are going to:

- Install serverless framework
- Create a serverless boilerplate application
- Deploy and test default bootstrapped API.

### What is Serverless Framework?

The serverless framework is an open-source NPM package that makes deploying functions to various serverless cloud hosting providers (in our case AWS lambda) easy.

With it, we can declare functions and the events that trigger those functions, and any other setups we need in a configuration file.

### Install the Serverless Framework

To install the serverless framework, ensure you have node.js installed, then in your command line, enter the command below

```bash
$ npm install -g serverless
```

The command above installed the serverless CLI package globally and we can check that it’s installed properly by issuing the command

```bash
$ serverless --version
Framework Core: 2.72.2
Plugin: 5.5.4
SDK: 4.3.2
Components: 3.18.2
```

 

### Create a serverless boilerplate application

What that out of the way, to test that everything is wired up properly for us to start writing our functions, we issue the command below in our command line to bootstrap a demo serverless REST API

```bash
$ serverless
```

We would be asked various questions as shown below

![screely-1663646224203.png](How%20to%20Build%20a%20Serverless%20API%20using%20AWS%20lambda,%20AP%20e5ed0a4536d84f648e7db8f8b4c904bb/screely-1663646224203.png)

Select the AWS - Node.js - HTTP API, It’ll as for an app name, and give the app a name, in my case, I used “**serverless-todo-app**”. It’ll then set up the project.

We’ll then be asked a few more questions.

For login/register to the serverless dashboard, for the sake of this project, we select “no”.

For deploying the project, select “no” for now too

After that, we are good to go.

CD into the project folder and open in vscode

```bash
$ cd serverless-todo-app
$ code .
```

We can now see the contents of the boilerplate application, specifically, the “**handler.js**” and “**serverless.yml**” files. We will look into those later.

### Deploy and test default bootstrapped API

Let's now deploy our demo app to see that it works.

In the project directory, we issue the command

```bash
$ serverless deploy
```

After a few seconds, you will be presented with an **endpoint** URL similar to the one below, among other information

```bash
https://53df424gq7.execute-api.us-east-1.amazonaws.com/
```

We simply go to that URL in our browser, you should see a result similar to the one below.

![screely-1663645991222.png](How%20to%20Build%20a%20Serverless%20API%20using%20AWS%20lambda,%20AP%20e5ed0a4536d84f648e7db8f8b4c904bb/screely-1663645991222.png)

If you see it, it means that our function is working and everything is wired up properly.
We can go back into AWS and in the top search box, we enter Lambda and click on the result, we should now see that a lambda function has been created for us automatically.

That's as a result of the deployment we just did.

We can now begin writing custom functions and persisting our data into a database.

## Step 3 - Connecting DynamoDB and Creating Lambda Functions

We are going to:

- Provision our database
- Create the serverless functions for our todo API
- Deploy Test our functions

We are creating a simple todo API and we need the data to be stored in a database for persistence.

Here, leverage DynamoDB, a NoSQL database provided by AWS.

### Provisioning our Database

With the serverless framework, we can define the AWS resources we want to use. We do that in the **serverless.yml** file provided for us, and the serverless framework will provision that resource for us on AWS, so we don't need to login into the AWS web interface to provision the resource.

Taking a look at the serverless.yml file inside our project folder, we have the following

![screely-1663674691050.png](How%20to%20Build%20a%20Serverless%20API%20using%20AWS%20lambda,%20AP%20e5ed0a4536d84f648e7db8f8b4c904bb/screely-1663674691050.png)

We will now add resources, in our case the database we want to use by adding a resources section to the file. *Take note of the indentation.*

```yaml
...
resources:
  Resources:
    TodoAPI: # We set the resource name: here we use TodoAPI as the name
      Type: AWS::DynamoDB::Table # Type of resource we are provisioning, in this case, a DynamoDB Table
      Properties: # The properties for the resource
        TableName: TodoApiTable # Here we set the table name to "TodoApiTable
        BillingMode: PAY_PER_REQUEST # The billing mode is set here
        AttributeDefinitions: # Represents an attribute for describing the key schema for the table and indexes.
          - AttributeName: id # An ID to Identify each record in a unique way
            AttributeType: S # The attribute is of type String, hence the S
        KeySchema: # Specifies the attributes that make up the primary key for a table or an index
          - AttributeName: id # The name of the key attribute
            KeyType: HASH # The ID as the key
```

The code above is what is known as AWS cloud formation.

Cloud Formation is basically **a method of provisioning AWS infrastructure using code.**

In the code above, we are provisioning an AWS resource to be used by our API, in this case, the DynamoDB.

We set the name and type of the database “**TodoAPI**”, and give it several properties.
We then went on to set a table name, the billing mode, and the attributes for the table.

Don't worry about the BillingMode as “PAY_PER_REQUEST”. AWS gives 1 million free requests, and we are unlikely to exceed that in this tutorial.

Finally, for the attributes, we specify that we need a primary key for the table and specify the type of the primary key.

To test this we just need to save the file and re-deploy the application

```bash
$ serverless deploy
```

To see that this works, we login to our AWS account, and in the search box, we search for “**DynamoDB**” click on it in the result, and click on tables on the left navigation section.

We can see that a table has been created for us automatically bearing our table name.

![screely-1663677720395.png](How%20to%20Build%20a%20Serverless%20API%20using%20AWS%20lambda,%20AP%20e5ed0a4536d84f648e7db8f8b4c904bb/screely-1663677720395.png)

Now, with most of the setup work out of the way, we can begin to write the functions for our API.

### Create the Serverless Functions for our todo API

What are serverless functions? they are basically just regular functions that we write, which performs, most of the time, a single task.

We then deploy or send these functions to cloud providers which then store them and can run/call them through certain events or triggers.

Let us change the structure of our boilerplate API a bit to make the project more modular.

Currently, the folder structure looks as seen below

![screely-1663680176904.png](How%20to%20Build%20a%20Serverless%20API%20using%20AWS%20lambda,%20AP%20e5ed0a4536d84f648e7db8f8b4c904bb/screely-1663680176904.png)

We create a source folder “src” and inside the source folder, we create another folder “handlers”.

Inside the project directory in your command line, enter the following command.

```bash
$ mkdir src && cd src
$ mkdir handlers
```

 We then move the handler.js file into the handlers folder and rename it to createTodo.js.

The folder structure should now look like below

![screely-1663681039480.png](How%20to%20Build%20a%20Serverless%20API%20using%20AWS%20lambda,%20AP%20e5ed0a4536d84f648e7db8f8b4c904bb/screely-1663681039480.png)

**Writing the createTodo Function**

Currently, in our createTodo.js file, we have the following contents which basically contain the code that runs when we tested our bootstrapped API.

```jsx
module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v2.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };
};
```

What the code above does is respond to a get request and return the request event details as JSON to the browser or client.

Before we proceed, we need to install a few packages to enable us to build the createTodo function.

We need two packages, one for generating a unique ID, and the other is AWS SDK for interacting with AWS from our function.

To install these, issue the following command in your command line, in the project directory.

```bash
$ npm init # This generates a package.json file for us(Press enter to accept default values) 
$ npm install aws-sdk uuid # this installs the aws-sdk and uuid packages from npm
```

With that done, we now replace the code in createTodo.js with the following

```jsx
const AWS = require('aws-sdk')
const { v4 } = require('uuid')

const createTodo = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient() // Connect to AWS DynamoDB

  const { todo } = JSON.parse(event.body)
  const id = v4()
  const createdAt = new Date().toISOString()

  const newTodo = {
    id,
    todo,
    createdAt,
  }

// Inserts new data (todo) into the DynamoDB
  await dynamodb.put({
    TableName: "TodoApiTable",
    Item: newTodo
  }).promise()

// Returns the newly added todo
  return {
    statusCode: 200,
    body: JSON.stringify(newTodo),
  };
};

module.exports = {
  handler: createTodo
}
```

In the code above, we first require the needed libraries, then we create a function to actually do the todo creation.

Inside the function, we first connect to dynamoDB by creating an instance of the connection using the aws-sdk.

```jsx
  const dynamodb = new AWS.DynamoDB.DocumentClient() // Connect to AWS DynamoDB
```

We then get the todo data from the event body. The **event** basically contains all the information from the request.

Next, we create an object containing the todo data coming from the event body and attach the genetated **id** and **createdAt** properties.

Next, using the database connection handler “dynamodb” we add a new todo into the “TodoApiTable”

```jsx
...  
await dynamodb.put({
    TableName: "TodoApiTable",
    Item: newTodo
  }).promise()
...
```

Finally, we return a status code and the body and export the handler for creating todo.

**Writing the getTodos Function**

We create another file “**getTodos.js**” inside our handlers folder. The getTodos get all the previously saved todo from our database.

 See the code below.

```jsx
const AWS = require('aws-sdk')

const getTodos = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient()

  let todos;

  try {
    const results = await dynamodb.scan({TableName: "TodoApiTable"}).promise()
    todos = results.Items
  } catch (error) {
      console.log(error)
  }

  return {
    statusCode: 200,
    body: JSON.stringify(todos),
  };
};

module.exports = {
  handler: getTodos
}
```

The code is similar to the **createTodo.js** code.

We start by importing the required libraries, we then use the `AWS sdk` client to get a connection to the database,

```jsx
  const dynamodb = new AWS.DynamoDB.DocumentClient()
```

The major difference from the code for `createTodo` is that, in this case, we are searching the database for the saved todo, so we use the dynamoDB scan method, and give it a table name to search from.

```jsx
const results = await dynamodb.scan({TableName: "TodoApiTable"}).promise()
```

And finally, we return the todos, with status a status code.

Now, we need to add our exported handler functions and set permissions so our functions can access dynamoDB.

We do that in the `serverless.yml` file.

Update it to look like seen below.

```yaml
service: serverless-todo-app
frameworkVersion: "2 || 3"

provider:
  name: aws
  runtime: nodejs12.x
  lambdaHashingVersion: "20201221"
	region: "us-east-1" # Replace the region here with your own
# Set permission for our functions
  iamRoleStatements:
  - Effect: Allow
    Action:
      - dynamodb:* # Perform all database actions (create/update/delete)
    Resource:
      - arn:aws:dynamodb:us-east-1:301048034781:table/TodoApiTable # Replace with your table unique identefier (ARN). It's found on AWS and check your table details

# Add function handlers
functions:
  createTodo:
    handler: src/handlers/createTodo.handler
    events:
      - httpApi:
          path: /
          method: post
  fetchTodos:
    handler: src/handlers/getTodos.handler
    events:
      - httpApi:
          path: /todos
          method: get

resources:
  Resources:
    TodoAPI: # We set the resource name: here we use TodoAPI as the name
      Type: AWS::DynamoDB::Table # Type of resource we are provisioning, in this case, a DynamoDB Table
      Properties: # The properties for the resource
        TableName: TodoApiTable # Here we set the table name to "TodoApiTable
        BillingMode: PAY_PER_REQUEST # The billing mode is set here
        AttributeDefinitions: # Represents an attribute for describing the key schema for the table and indexes.
          - AttributeName: id # An ID to Identify each record in a unique way
            AttributeType: S # The attribute is of type String, hence the S
        KeySchema: # Specifies the attributes that make up the primary key for a table or an index
          - AttributeName: id # The name of the key attribute
            KeyType: HASH # The ID as the key
```

**Deploying and Testing our Functions**

To deploy our functions it’s as easy as using the command we used previously for deployment.
Having saved our code, we enter the command below into our CLI to deploy our API

```bash
$ serverless deploy
```

After a few seconds, we get a link to our endpoint, yours will look a little different.

*Note: I omitted some characters in my endpoint below, cause it’s not safe showing you mine.*

```yaml
endpoints:
	https://...zfq96rti.execute-api.us-east-1.amazonaws.com
	https://...zfq96rti.execute-api.us-east-1.amazonaws.com/todos
```

We can now test our endpoint using postman

Testing createTodo:

![screely-1663936387674-create.png](How%20to%20Build%20a%20Serverless%20API%20using%20AWS%20lambda,%20AP%20e5ed0a4536d84f648e7db8f8b4c904bb/screely-1663936387674-create.png)

Testing getTodos

![screely-1663936406385-get.png](How%20to%20Build%20a%20Serverless%20API%20using%20AWS%20lambda,%20AP%20e5ed0a4536d84f648e7db8f8b4c904bb/screely-1663936406385-get.png)

### Conclusion

We have successfully created a serverless API with the serverless framework, used Lambda functions, and connected our API to dynamoBD to persist our data.

If you made it to the end, congratulations.

Share and drop your comments below.
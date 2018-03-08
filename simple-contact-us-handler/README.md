# simple-contact-us-handler

This is a sample application developed with revolutionary serverless IDE Sigma, to demonstrate the use of AWS Lambda, DynamoDB and API Gateway to implement a simple contact us form for a static web site.

## Deploy with CloudFormation

Prerequisites: [Node.js](https://nodejs.org/en/) and [AWS CLI](http://docs.aws.amazon.com/cli/latest/userguide/installing.html) should be installed

### Packaging

Deploying this serverless app to your AWS account can be done using [AWS CloudFormation](https://aws.amazon.com/cloudformation/). 
Navigate it into the folder simple-contact-us-handler.
With the [AWS CLI](https://aws.amazon.com/cli/) installed, run the following command to upload the code to S3. Ensure that you set the environment variable `DEPLOYMENT_S3_BUCKET`; CloudFormation will copy the code function as a ZIP file in this S3 bucket, which can be deployed to AWS Lambda by following the below steps. 

* Store the name of your S3 bucket in a shell variable:
	* `export DEST_BUCKET=bucket`

* Install the node modules required:
	* `npm install`
	
* Build:
	* `npm run build`

* Upload the package to S3, transform the CloudFormation template:
	* `npm run package`
	
* Deploy to CloudFormation:
	* `npm run deploy`

Now you will have `cloudformation-packaged.yaml`, which contains the full path to the ZIP file created by the previous step. 
You will be able to deploy your stack using the following command. 
aws cloudformation deploy --template-file cloudformation-packaged.yaml --stack-name contact-us-stack --capabilities CAPABILITY_IAM

## Deploy from the AWS Serverless Application Repository
* Create the code and destination buckets
* Hit "Deploy" from the [application]() page


## Testing the deployed contact-us handler
After the deployment, you can test this sample application by sending an HTTP request to the created API Gateway (activity-stream-proxy). To find the endpoint URL, please follow these steps.

1. Sign in to the AWS Management Console, and then open the API Gateway console at [https://console.aws.amazon.com/apigateway/](https://console.aws.amazon.com/apigateway/ "Amazon API Gateway").
2. Make sure that you are signed in to the AWS region where you selected when creating the Sigma project.
3. On the API Gateway page, in the APIs list, select "contact_us" API.

### Testing data persisting endpoint (/contact)
In the Stages navigation pane, expand the Prod stage, select POST on /contact, and then copy the Invoke URL value in the format of https://{api-id}.execute-api.{region}.amazonaws.com/Prod/contact.

Send the following sample JSON payload to the above endpoint using a HTTP clinet.

```
{
    "comment":"Sigma is Awsome!",
    "company":"SlappForge",
    "email":"email@email.com",
    "name":"Chathura Widanage",
    "phone":"1111111111"
}
```

### Testing data reading endpoint (/view)
This endpoint expects a query parameter `date` with the target date formatted as `MM/dd/yyyy`. So you may send a GET request to https://{api-id}.execute-api.{region}.amazonaws.com/Prod/view?date=2/7/2018 to view the entries for the targetted date.
For this API call, you will recieve a JSON response as follows.

```
{
    "Items":[
            {
                "entryDate":"7/2/2018",
                "comment":"My comment",
                "company":"Slappforge",
                "email":"email@email.com",
                "name":"Chathura Widanage",
                "phone":"11111111111"
            },
             {
                "entryDate":"7/2/2018",
                "comment":"My comment",
                "company":"Slappforge",
                "email":"myname@email.com",
                "name":"My Name",
                "phone":"11111111111"
            }
        ],
    "Count":2,
    "ScannedCount":2
}
``` 


## License
```
Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in 
compliance with the License. You may obtain a copy of the License at 

http://www.apache.org/licenses/LICENSE-2.0 

Unless required by applicable law or agreed to in writing, software distributed under the License is 
distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
See the License for the specific language governing permissions and limitations under the License. `
```
## Acknowledgments
* [**Chathura Widanage**](https://github.com/chathurawidanage)
* Awesome SLAppForge team
* Amazon Web Services 

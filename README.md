# iot-cloud-webapp

SSH into the AWS Cloud EC2 instance using the command:
    `ssh -i iot_1.pem ec2-user@ec2-18-191-189-75.us-east-2.compute.amazonaws.com`
Note: .pem file not shared for security purposes

Clone the repository on the ec2 machine using:
    `git clone https://github.com/chirrag03/iot-cloud-webapp.git`

Navigate to the project directory:
    `cd frontend`

To run this project, you need to have Node.js and npm installed on your computer. Install them using:
    `sudo apt-get install nodejs npm`

Install the required node packages for the project:
    `npm install`

To start the app, run:
    `npm start`

This will start the app and can be accessed from your browser at http://ec2-18-191-189-75.us-east-2.compute.amazonaws.com:3000.





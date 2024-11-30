pipeline {
    agent any

    environment {
        SERVICE_NAME = "tour-system-front"
    }

    stages {
        stage("Build"){
            steps {
                sh "npm install"
                sh "npm run build"
            }
        }
        stage("Publish"){
            steps {
                sh "sudo cp -r ./dist/* /tour-system-front"
            }
        }
    }
}
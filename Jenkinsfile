pipeline {
    agent any

    environment {
        SERVICE_NAME = "tour-system-front"
        HTTP_PORT = 5173
        DB_URL = credentials("common-db-url")
        DB_USERNAME = credentials("common-db-username")
        DB_PASSWORD = credentials("common-db-password")
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
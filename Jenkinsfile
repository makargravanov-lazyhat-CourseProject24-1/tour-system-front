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
        stage("Image"){
            steps {
                sh "sudo docker build -t jetlabs/${SERVICE_NAME}:latest -t jetlabs/${SERVICE_NAME}:${BUILD_NUMBER} ."
            }
        }
        stage("Deploy"){
            steps {
                script {
                    try {
                        sh "sudo docker container stop ${SERVICE_NAME}"
                        sh "sudo docker container rm ${SERVICE_NAME}"
                    } catch(err) {
                        echo "Container does not exists."
                    }
                }
                sh "sudo docker run --detach --name ${SERVICE_NAME} -p 8020:${HTTP_PORT} --network=service_postgresql--service jetlabs/${SERVICE_NAME}:latest"
            }
        }
    }
}
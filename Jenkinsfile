pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                sh 'docker build -t inf324/sparql-service .'
            }
        }
        stage('Re-Deploy') { 
            steps {
                sh 'docker stop sparql-service'
                sh 'docker rm sparql-service'

                sh 'docker run --name sparql-service -p 3020:3020 -d inf324/sparql-service'
            }
        }
    }
}
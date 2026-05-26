pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        FRONTEND_IMAGE = "naman458/url-shortener-frontend"
        BACKEND_IMAGE = "naman458/url-shortener-backend"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                url: 'https://github.com/naman458/url-shortener-devops.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    bat 'docker build -t %BACKEND_IMAGE% .'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    bat 'docker build -t %FRONTEND_IMAGE% .'
                }
            }
        }

        stage('Docker Hub Login') {
            steps {
                bat 'docker login -u %DOCKERHUB_CREDENTIALS_USR% -p %DOCKERHUB_CREDENTIALS_PSW%'
            }
        }

        stage('Push Backend Image') {
            steps {
                bat 'docker push %BACKEND_IMAGE%'
            }
        }

        stage('Push Frontend Image') {
            steps {
                bat 'docker push %FRONTEND_IMAGE%'
            }
        }
    }
}
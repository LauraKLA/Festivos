pipeline {
    agent any

    environment{
        REPO_URL='https://github.com/LauraKLA/Festivos'
        BRANCH= 'main'
        DOCKER_IMAGE= 'dockerapifestivos'
    }
    stages{
        stage('Clonar respositorio'){
            steps{
                git branch: "${BRANCH}", credentialsId: "100", url: "${REPO_URL}"
            }
        }

        stage('Construir imagen de Docker'){
            steps{
                script{
                    bat 'docker build -t %DOCKER_IMAGE% .'
                }
            }
    }

    stage('Crear contenedor'){
        steps{
            script{
                bat'docker container run --network redcalendario --name dockerapifestivos -p 8580:3030 -d %DOCKER_IMAGE%'
            }

        }

    }
}
}
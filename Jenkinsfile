pipeline {
    environment{
        REPO_URL='https://github.com/LauraKLA/Festivos'
        BRANCH= 'main'
        DOCKER_IMAGE= 'dockerapifestivos'
    }
    stages{
        stages('Clonar respositorio'){
            steps{
                git branch: "${BRANCH}", credentialsId: "100", url: "${REPO_URL}"
            }
        }

        stages('Construir imagen de Docker'){
            steps{
                script{
                    bat 'docker build -t %DOCKER_IMAGE%'
                }
            }
    }

    stages('Crear contenedor'){
        steps{
            script{
                bat'docker container run --network redcalendario --name dockerapifestivos -p 8580:3030 -d %DOCKER_IMAGE%'
            }

        }

    }
}
}
pipeline {
    agent any

    environment{
        REPO_URL='https://github.com/LauraKLA/Festivos'
        BRANCH= 'main'
        DOCKER_IMAGE= 'dockerapifestivos:latest'
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
                    bat "docker build -t ${DOCKER_IMAGE} ."
                }
            }
        }

        stage('Detener contenedor existente'){
             steps{
              script{
                    catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE'){
                        bat """
                        docker container inspect dockerapifestivos > nul 2>&1 &&(
                            docker container stop dockerapifestivos
                            docker container rm dockerapifestivos
                            ) || echo "No existe el contenedor 'dockerapifestivos'"
                        """
                    }
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
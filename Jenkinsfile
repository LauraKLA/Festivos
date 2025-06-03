pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/LauraKLA/Festivos'
        BRANCH = 'main'
        IMAGE_NAME = 'dockerapifestivos'
    }

    stages {
        stage('Clonar repositorio') {
            steps {
                git branch: "${BRANCH}", credentialsId: "100", url: "${REPO_URL}"
            }
        }

        stage('Construir imagen de Docker') {
            steps {
                script {
                    def buildTag = "${env.BUILD_ID}"
                    def imageWithTag = "${IMAGE_NAME}:${buildTag}"
                    def imageLatest = "${IMAGE_NAME}:latest"

                    // Construye con etiqueta única
                    bat "docker build --rm -t ${imageWithTag} ."

                    // Etiqueta también como latest
                    bat "docker tag ${imageWithTag} ${imageLatest}"
                }
            }
        }

        stage('Limpiar imágenes dangling') {
            steps {
                script {
                    bat "docker image prune -f"
                }
            }
        }

        stage('Detener contenedor existente') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') {
                        bat """
                        docker container inspect dockerapifestivos > nul 2>&1 && (
                            docker container stop dockerapifestivos
                            docker container rm dockerapifestivos
                        ) || echo "No existe el contenedor 'dockerapifestivos'."
                        """
                    }
                }
            }
        }

        stage('Crear contenedor') {
            steps {
                script {
                    bat "docker container run --network dockerbdfestivos_red --name dockerapifestivos -p 8580:3030 -d ${IMAGE_NAME}:latest"
                }
            }
        }
    }
}



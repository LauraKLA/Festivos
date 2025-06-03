pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/LauraKLA/Festivos'
        BRANCH = 'main'
        DOCKER_IMAGE = 'dockerapifestivos:latest'
        IMAGE_NAME = 'dockerapifestivos'
    }

    stages {
        stage('Clonar repositorio') {
            steps {
                git branch: "${BRANCH}", credentialsId: "100", url: "${REPO_URL}"
            }
        }

        stage('Eliminar imagen previa') {
            steps {
                script {
                    bat """
                    for /f "tokens=*" %%i in ('docker images -q ${DOCKER_IMAGE}') do docker rmi -f %%i
                    """
                }
            }
        }

        stage('Construir imagen de Docker') {
            steps {
                script {
                    bat "docker build --rm --force-rm -t ${DOCKER_IMAGE} ."
                }
            }
        }

        stage('Limpiar imágenes dangling (por si acaso)') {
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
                        docker container inspect ${IMAGE_NAME} > nul 2>&1 && (
                            docker container stop ${IMAGE_NAME}
                            docker container rm ${IMAGE_NAME}
                        ) || echo "No existe el contenedor '${IMAGE_NAME}'."
                        """
                    }
                }
            }
        }

        stage('Crear contenedor') {
            steps {
                script {
                    bat "docker run --network dockerbdfestivos_red --name ${IMAGE_NAME} -p 8580:3030 -d ${DOCKER_IMAGE}"
                }
            }
        }
    }
}

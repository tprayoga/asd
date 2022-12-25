def secret = 'januarto'
def server = 'root@178.128.56.130'
def dir = 'web-pwa-olin/'
def branch = 'main'
def image = 'web-pwa-olin:1-bisa'

pipeline{
        agent any
        stages{
                stage ('Dele'){
                        steps{
                                sshagent([secret]) {
                                        sh """ssh -o StrictHostKeyChecking=no ${server} << EOF
                                        cd ${dir}
					git pull origin ${branch}
                                        exit
                                        EOF"""
                                }
                        }
                }
        stage ('Build'){
                        steps{
                                sshagent([secret]) {
                                        sh """ssh -o StrictHostKeyChecking=no ${server} << EOF
                                        cd ${dir}
					docker build -t ${image} .
                                        exit
                                        EOF"""
                                }
                        }
                }
        stage ('Deploy'){
                        steps{
                                sshagent([secret]) {
                                        sh """ssh -o StrictHostKeyChecking=no ${server} << EOF
                                        cd ${dir}
					docker compose up -d
                                        exit
                                        EOF"""
                                }

                        }

               }

        }

}

const Docker = require('dockerode');
const docker = new Docker();

const CONTAINERS_TO_MONITOR = ["java", "python"];

async function monitorSpecificContainers() {
    try {
        console.log('Démarrage du script de surveillance des conteneurs spécifiques...');

        while (true) {
            const containers = await docker.listContainers({ all: true });

            for (const containerInfo of containers) {
                const containerName = containerInfo.Names[0].replace("/", ""); // Retirer le "/" au début du nom

                if (CONTAINERS_TO_MONITOR.includes(containerName) && containerInfo.State === 'exited') {
                    console.log(`Conteneur arrêté détecté : ${containerName}. Redémarrage en cours...`);

                    const container = docker.getContainer(containerInfo.Id);
                    try {
                        await container.start();
                        console.log(`Conteneur ${containerName} redémarré avec succès.`);
                    } catch (err) {
                        console.error(`Erreur lors du redémarrage du conteneur ${containerName} :`, err.message);
                    }
                }
            }

            // Attendre 30 secondes avant la prochaine vérification
            await new Promise(resolve => setTimeout(resolve, 30000));
        }
    } catch (err) {
        console.error('Erreur dans le script de surveillance :', err.message);
    }
}

monitorSpecificContainers();

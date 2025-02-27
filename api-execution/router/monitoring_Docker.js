const Docker = require('dockerode');
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

async function monitorContainers() {
    try {
        console.log('Démarrage du script de surveillance des conteneurs...');

        while (true) {
            const containers = await docker.listContainers({ all: true });

            for (const containerInfo of containers) {
                const container = docker.getContainer(containerInfo.Id);

                const containerDetails = await container.inspect();
                const containerNetworks = Object.keys(containerDetails.NetworkSettings.Networks);

                // Vérifiez si le conteneur est arrêté
                if (containerNetworks.includes('jeancademie.net') && containerInfo.State === 'exited') {
                    console.log(`Conteneur arrêté détecté : ${containerInfo.Names[0]}. Redémarrage en cours...`);

                    try {
                        await container.start();
                        console.log(`Conteneur ${containerInfo.Names[0]} redémarré avec succès.`);
                    } catch (err) {
                        console.error(`Erreur lors du redémarrage du conteneur ${containerInfo.Names[0]} :`, err.message);
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

// Lancer le script
monitorContainers();

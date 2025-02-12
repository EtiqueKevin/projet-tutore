import { defineStore } from 'pinia'

export const useStudentStore = defineStore('student', {
    state: () => ({
        idLesson: null,
        idExercice: null,

        currentModule: {
            id: 0,
            name: "",
            description: "",
            creator: "",
            lessonCount: 0,
            lastUpdate: new Date(),
            lessons: []
        },
        currentLesson: {
            title: "",
            description: "",
            content: []
        },
        currentExercice: {
            statement: "",
            files: []
        },
    }),

    actions: {
        setCurrentExercice(exercice) {
            this.currentExercice = exercice
        },
        async loadModule(id) {
            try{
                const res = await this.$api.get(`/modules/${id}`);
                console.log(res.data);
                this.currentModule = {
                    id: res.data.module.id,
                    name: res.data.module.name,
                    description: res.data.module.description,
                    creator: res.data.module.idCreator,
                    lessonCount: res.data.module.nblesson,
                    lastUpdate: new Date(parseInt(res.data.module.dateupdate)),
                    lessons: []
                };

                console.log(this.currentModule.name);
                
                const resLessons = await this.$api.get(`/modules/${id}/lessons`);
                console.log(resLessons.data);
                this.currentModule.lessons = resLessons.data.lessons;
            }catch(error){
                console.log(error);
            }
        },
        loadCours(id) {
            // In a real application, this would be fetched from an API
            this.currentLesson = {
                "title": "Introduction à la Programmation Java",
                "description": "Ce cours vous permettra d'apprendre les bases de la programmation en Java, des concepts fondamentaux aux premières applications.",
                "content": [
                    {
                        "type": "text",
                        "content": `# Introduction aux Variables en Java

Les variables sont des conteneurs pour stocker des données. En Java, chaque variable doit avoir un type spécifique.

## Types de Variables Primitifs

- \`int\`: Pour les nombres entiers
- \`double\`: Pour les nombres décimaux
- \`boolean\`: Pour les valeurs true/false
- \`char\`: Pour les caractères simples

## Exemple

\`\`\`java
int age = 25;
double taille = 1.75;
boolean estEtudiant = true;
char groupe = 'A';
\`\`\`

## Bonnes Pratiques

1. Utilisez des noms descriptifs
2. Commencez les noms de variables par une minuscule
3. Utilisez la convention camelCase
`
                    },
                    {
                        "type": "exercice",
                        "statement": `# Exercice: Calculateur d'IMC

Créez une classe \`CalculIMC\` qui calcule l'Indice de Masse Corporelle.

## Consignes:
- Créez une méthode \`calculerIMC\` qui prend deux paramètres:
  - \`poids\` (double) en kilogrammes
  - \`taille\` (double) en mètres
- La formule est: IMC = poids / (taille * taille)
- Retournez le résultat arrondi à 2 décimales

## Exemple:
Pour un poids de 70kg et une taille de 1.75m, l'IMC devrait être 22.86`,
                        "files": [
                            {
                                "type": "file",
                                "filename": "CalculIMC.java",
                                "content": "public class CalculIMC {\n    // Écrivez votre code ici\n\n}",
                                "language": "java"
                            },
                            {
                                "type": "test",
                                "filename": "CalculIMCTest.java",
                                "content": `import org.junit.Test;
import static org.junit.Assert.*;

public class CalculIMCTest {
    @Test
    public void testCalculIMC() {
        CalculIMC calc = new CalculIMC();
        assertEquals(22.86, calc.calculerIMC(70.0, 1.75), 0.01);
        assertEquals(20.76, calc.calculerIMC(60.0, 1.70), 0.01);
    }
}`,
                                "language": "java"
                            }
                        ]
                    },
                    {
                        "type": "text",
                        "content": `# Les Structures Conditionnelles

Les structures conditionnelles permettent d'exécuter différentes parties de code selon certaines conditions.

## L'instruction if-else

\`\`\`java
if (condition) {
    // code exécuté si la condition est vraie
} else {
    // code exécuté si la condition est fausse
}
\`\`\`

## Interprétation de l'IMC

- IMC < 18.5 : Sous-poids
- 18.5 ≤ IMC < 25 : Poids normal
- 25 ≤ IMC < 30 : Surpoids
- IMC ≥ 30 : Obésité`
                    }
                ]
            }
        },
        async getModules(){
            try{
                const res = await this.$api.get('/modules');
                return res.data.modules;
            }catch(error){
                console.log(error);
            }
        }
    },

    getters: {
        currentCours(state) {
            return state.currentLesson;
        },

        isExerciceLoaded(state) {
            return state.currentExercice.statement !== "";
        },

        getCurrentModule(state) {
            return state.currentModule;
        }
    },
    
    persist: {
        enabled: true,
        strategies: [
            { storage: localStorage, paths: ['idModule', 'idLesson', 'idExercice'] }
        ]
    }
})
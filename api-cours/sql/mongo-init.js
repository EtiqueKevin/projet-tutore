db = db.getSiblingDB('cours');

db.modules.insertMany([
  {
    _id: UUID("550e8400-e29b-41d4-a716-446655440000"),
    id_creator: UUID("85e2662f-fe2a-4bb7-933d-81a6ab467057"),
    name: "Introduction à Java",
    description: "Apprentissage des bases de la programmation en Java",
    nblesson: 2,
    date_update: new Date()
  },
  {
    _id: UUID("550e8400-e29b-41d4-a716-446655440001"),
    id_creator: UUID("85e2662f-fe2a-4bb7-933d-81a6ab467057"),
    name: "Programmation Orientée Objet en Java",
    description: "Approfondissement des concepts de la POO avec Java",
    nblesson: 2,
    date_update: new Date()
  },
  {
    _id: UUID("550e8400-e29b-41d4-a716-446655440002"),
    id_creator: UUID("85e2662f-fe2a-4bb7-933d-81a6ab467057"),
    name: "Structures de Données et Algorithmes en Java",
    description: "Étude des structures de données et des algorithmes classiques en Java",
    nblesson: 2,
    date_update: new Date()
  },
  {
    _id: UUID("550e8400-e29b-41d4-a716-446655440004"),
    id_creator: UUID("85e2662f-fe2a-4bb7-933d-81a6ab467057"),
    name: "Introduction à Python",
    description: "Apprentissage des bases de la programmation en Python",
    nblesson: 2,
    date_update: new Date()
  },
  {
    _id: UUID("550e8400-e29b-41d4-a716-446655440005"),
    id_creator: UUID("85e2662f-fe2a-4bb7-933d-81a6ab467057"),
    name: "Programmation Orientée Objet en Python",
    description: "Exploration des principes de la POO avec Python",
    nblesson: 2,
    date_update: new Date()
  },
  {
    _id: UUID("550e8400-e29b-41d4-a716-446655440007"),
    id_creator: UUID("85e2662f-fe2a-4bb7-933d-81a6ab467057"),
    name: "Automatisation avec Python",
    description: "Utilisation de Python pour l'automatisation des tâches répétitives",
    nblesson: 2,
    date_update: new Date()
  }
]);

db.lessons.insertMany([
  {
    _id: UUID("660e8400-e29b-41d4-a716-446655440000"),
    name: "Les bases des fonctions en Java",
    description: "Apprendre à créer et utiliser des fonctions en Java",
    type: "langage",
    content: [
      {
        "index": 0,
        "type": "text",
        "content": "Une **fonction** en Java (appelée aussi **méthode**) est un bloc de code réutilisable qui effectue une tâche spécifique. Elles permettent :\n\n- D'organiser notre code de manière plus claire.\n- D'éviter la répétition du code en encapsulant des comportements réutilisables.\n- D'améliorer la lisibilité et la maintenabilité du programme."
      },
      {
        index: 1,
        type: 'code',
        content: '## Adition \n Créez une fonction qui calcule la somme de deux nombres.\n\n Pour ajouter deux nombres, on utilise l\'opérateur `+`.',
        files: [
          {
            content: `public class Calculator {
    public static int add(int a, int b) {
        // TODO: Retourner la somme de a et b
        return 0;
    }
}`,
            filename: 'Calculator.java',
            language: 'java',
            type: 'file'
          },
          {
            content: `import org.junit.Test;
import static org.junit.Assert.*;

public class CalculatorTest {
    @Test
    public void testAdd() {
        assertEquals("Avez-vous bien utilisé l'opérateur + ?", 5, Calculator.add(2, 3));
        assertEquals(0, Calculator.add(0, 0));
        assertEquals( -5, Calculator.add(-2, -3));
    }
}
`,
            filename: 'CalculatorTest.java',
            language: 'java',
            type: 'test'
          }
        ]
      },
      {
        index: 2,
        type: 'text',
        content: 'Les fonctions peuvent aussi retourner des chaînes de caractères. Voyons comment créer une fonction qui formate un message de bienvenue.'
      },
      {
        index: 3,
        type: 'code',
        content: 'Créez une fonction qui génère un message de bienvenue personnalisé',
        files: [
          {
            content: `public class Greeter {
    public static String createWelcomeMessage(String name) {
        // TODO: Retourner "Bonjour, [name]!"
        return "";
    }
}`,
            filename: 'Greeter.java',
            language: 'java',
            type: 'file'
          },
          {
            content: `import org.junit.Test;
import static org.junit.Assert.*;

public class GreeterTest {
    @Test
    public void testCreateWelcomeMessage() {
        assertEquals("Bonjour, Alice!", Greeter.createWelcomeMessage("Alice"));
        assertEquals("Bonjour, Bob!", Greeter.createWelcomeMessage("Bob"));
    }
}`,
            filename: 'GreeterTest.java',
            language: 'java',
            type: 'test'
          }
        ]
      },
      {
        "index": 4,
        "type": "quizz",
        "content": "Les bases des fonctions en Java",
        "questions": [
          {
            "question": "Comment définit-on une fonction en Java ?",
            "options": [
              "def maFonction() {}",
              "function maFonction() {}",
              "void maFonction() {}",
              "public void maFonction() {}"
            ],
            "correctAnswer": 3
          },
          {
            "question": "Quelle est la valeur de retour d'une fonction déclarée avec void ?",
            "options": [
              "null",
              "void",
              "Aucune",
              "0"
            ],
            "correctAnswer": 2
          },
          {
            "question": "Comment appelle-t-on une fonction statique 'calcul' de la classe 'Utils' ?",
            "options": [
              "Utils.calcul()",
              "calcul(Utils)",
              "new Utils().calcul()",
              "Utils->calcul()"
            ],
            "correctAnswer": 0
          },
          {
            "question": "Quel mot-clé est utilisé pour retourner une valeur dans une fonction ?",
            "options": [
              "break",
              "return",
              "exit",
              "yield"
            ],
            "correctAnswer": 1
          },
          {
            "question": "Que se passe-t-il si une fonction retourne un entier mais ne contient pas d'instruction return ?",
            "options": [
              "La valeur 0 est retournée par défaut",
              "Le programme ne compile pas",
              "Une exception est levée à l'exécution",
              "Une valeur aléatoire est retournée"
            ],
            "correctAnswer": 1
          }
        ]
      }

    ],
    date_update: new Date()
  },
{
    "_id": UUID("660e8400-e29b-41d4-a716-446655440001"),
    "name": "Les bases des boucles en Java",
    "description": "Apprendre à utiliser les différents types de boucles en Java pour répéter des instructions",
    "type": "langage",
    "content": [
      {
        "index": 0,
        "type": "text",
        "content": "# Introduction aux boucles en Java\n\nUne **boucle** en Java est une structure de contrôle qui permet d'exécuter un bloc de code plusieurs fois. Les boucles sont essentielles car elles permettent :\n\n- D'automatiser les tâches répétitives\n- De parcourir des collections de données (tableaux, listes)\n- De traiter des entrées utilisateur jusqu'à ce qu'une condition soit remplie\n- D'optimiser le code en évitant la duplication d'instructions\n\nJava propose trois types principaux de boucles :\n\n1. **La boucle for** : utilisée lorsque le nombre d'itérations est connu à l'avance\n2. **La boucle while** : utilisée lorsque le nombre d'itérations n'est pas connu et dépend d'une condition\n3. **La boucle do-while** : similaire à while, mais garantit que le bloc de code s'exécute au moins une fois\n\nChaque type de boucle a ses avantages et ses cas d'utilisation spécifiques que nous allons explorer en détail."
      },
      {
        "index": 1,
        "type": "text",
        "content": "## La boucle for\n\nLa boucle `for` est la structure la plus couramment utilisée lorsque vous connaissez à l'avance le nombre d'itérations à effectuer.\n\n### Syntaxe de la boucle for\n\n```java\nfor (initialisation; condition; incrémentation) {\n    // bloc de code à exécuter\n}\n```\n\nLa boucle for se compose de trois parties :\n1. **Initialisation** : exécutée une seule fois au début de la boucle\n2. **Condition** : évaluée avant chaque itération; si elle est vraie, le bloc de code est exécuté\n3. **Incrémentation** : exécutée après chaque itération\n\n### Exemple simple\n\n```java\n// Affiche les nombres de 1 à 5\nfor (int i = 1; i <= 5; i++) {\n    System.out.println(i);\n}\n```\n\n### Cas d'utilisation courants\n\n- Parcourir des tableaux ou des collections avec un indice\n- Exécuter un code un nombre précis de fois\n- Générer des séquences numériques"
      },
      {
        "index": 2,
        "type": "code",
        "content": "## Exercice 1 : Affichage des nombres avec la boucle for\n\n### Objectif\nCréez une fonction qui affiche les nombres de 1 à n en utilisant une boucle for.\n\n### Instructions\n1. Implémentez la méthode `printNumbers` qui prend un entier positif n en paramètre\n2. Utilisez une boucle for pour afficher tous les nombres de 1 à n inclus\n3. Chaque nombre doit être affiché sur une nouvelle ligne\n\n### Rappel sur la boucle for\nLa boucle for est idéale quand on connaît à l'avance le nombre d'itérations. Sa syntaxe est :\n```java\nfor (initialisation; condition; incrémentation) {\n    // code à répéter\n}\n```",
        "files": [
          {
            "content": "public class Counter {\n    public static void printNumbers(int n) {\n        // TODO: Utiliser une boucle for pour afficher les nombres de 1 à n\n        // Chaque nombre doit être sur une nouvelle ligne\n    }\n}",
            "filename": "Counter.java",
            "language": "java",
            "type": "file"
          },
          {
            "content": "import org.junit.Test;\nimport java.io.ByteArrayOutputStream;\nimport java.io.PrintStream;\nimport static org.junit.Assert.*;\n\npublic class CounterTest {\n    @Test\n    public void testPrintNumbers() {\n        ByteArrayOutputStream outContent = new ByteArrayOutputStream();\n        System.setOut(new PrintStream(outContent));\n        \n        Counter.printNumbers(5);\n        \n        String expected = \"1\\n2\\n3\\n4\\n5\\n\";\n        assertEquals(expected, outContent.toString());\n        \n        System.setOut(System.out);\n    }\n}",
            "filename": "CounterTest.java",
            "language": "java",
            "type": "test"
          }
        ]
      },
      {
        "index": 3,
        "type": "text",
        "content": "## La boucle while\n\nLa boucle `while` exécute un bloc de code tant qu'une condition spécifiée est vraie. Elle est particulièrement utile lorsque le nombre d'itérations n'est pas connu à l'avance.\n\n### Syntaxe de la boucle while\n\n```java\nwhile (condition) {\n    // bloc de code à exécuter\n}\n```\n\n### Fonctionnement\n1. La condition est évaluée avant chaque itération\n2. Si la condition est vraie, le bloc de code est exécuté\n3. Si la condition est fausse, la boucle se termine et l'exécution continue après la boucle\n\n### Exemple simple\n\n```java\n// Compte à rebours à partir de 5\nint count = 5;\nwhile (count > 0) {\n    System.out.println(count);\n    count--;\n}\nSystem.out.println(\"Décollage !\");\n```\n\n### Cas d'utilisation courants\n\n- Traitement des entrées utilisateur jusqu'à ce qu'une condition soit remplie\n- Recherche d'éléments dans des collections sans connaître leur position exacte\n- Exécution de tâches tant qu'une ressource est disponible\n- Algorithmes itératifs où la condition d'arrêt n'est pas liée à un compteur\n\n### Attention au risque de boucle infinie\n\nSi la condition de la boucle while ne devient jamais fausse, vous créez une boucle infinie :\n\n```java\n// Boucle infinie - à éviter !\nwhile (true) {\n    System.out.println(\"Ceci s'exécutera pour toujours\");\n}\n```\n\nAssurez-vous toujours que votre condition puisse devenir fausse à un moment donné."
      },
      {
        "index": 4,
        "type": "code",
        "content": "## Exercice 2 : Recherche avec la boucle while\n\n### Objectif\nUtilisez une boucle while pour trouver le premier nombre pair dans un tableau d'entiers.\n\n### Instructions\n1. Implémentez la méthode `findFirstEvenNumber` qui prend un tableau d'entiers en paramètre\n2. Utilisez une boucle while pour parcourir le tableau jusqu'à trouver le premier nombre pair\n3. Retournez ce nombre s'il existe, sinon retournez -1\n\n### Rappel sur la boucle while\nLa boucle while est idéale quand on ne connaît pas à l'avance le nombre d'itérations et qu'on souhaite continuer tant qu'une condition est vraie. Sa syntaxe est :\n```java\nwhile (condition) {\n    // code à répéter\n}\n```",
        "files": [
          {
            "content": "public class EvenNumberFinder {\n    public static int findFirstEvenNumber(int[] numbers) {\n        // TODO: Utiliser une boucle while pour trouver le premier nombre pair \n        // dans le tableau. Retourner ce nombre s'il existe, sinon retourner -1.\n        return -1;\n    }\n}",
            "filename": "EvenNumberFinder.java",
            "language": "java",
            "type": "file"
          },
          {
            "content": "import org.junit.Test;\nimport static org.junit.Assert.*;\n\npublic class EvenNumberFinderTest {\n    @Test\n    public void testFindFirstEvenNumber() {\n        assertEquals(4, EvenNumberFinder.findFirstEvenNumber(new int[]{3, 5, 4, 2, 7}));\n        assertEquals(2, EvenNumberFinder.findFirstEvenNumber(new int[]{1, 2, 3, 4}));\n        assertEquals(-1, EvenNumberFinder.findFirstEvenNumber(new int[]{1, 3, 5, 7}));\n        assertEquals(-1, EvenNumberFinder.findFirstEvenNumber(new int[]{}));\n    }\n}",
            "filename": "EvenNumberFinderTest.java",
            "language": "java",
            "type": "test"
          }
        ]
      },
      {
        "index": 5,
        "type": "text",
        "content": "## La boucle do-while\n\nLa boucle `do-while` est une variante de la boucle while qui garantit que le bloc de code est exécuté au moins une fois, même si la condition est initialement fausse.\n\n### Syntaxe de la boucle do-while\n\n```java\ndo {\n    // bloc de code à exécuter\n} while (condition);\n```\n\n### Fonctionnement\n1. Le bloc de code est exécuté une première fois sans vérifier la condition\n2. Après cette première exécution, la condition est évaluée\n3. Si la condition est vraie, le bloc de code est exécuté à nouveau\n4. Les étapes 2 et 3 se répètent jusqu'à ce que la condition devienne fausse\n\n### Exemple simple\n\n```java\n// Demander à l'utilisateur d'entrer un nombre positif\nimport java.util.Scanner;\n\npublic class PositiveNumberInput {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        int number;\n        \n        do {\n            System.out.println(\"Veuillez entrer un nombre positif :\");\n            number = scanner.nextInt();\n        } while (number <= 0);\n        \n        System.out.println(\"Vous avez entré le nombre positif : \" + number);\n        scanner.close();\n    }\n}\n```\n\n### Cas d'utilisation courants\n\n- Validation d'entrées utilisateur (au moins une tentative est nécessaire)\n- Menus interactifs où l'utilisateur doit faire au moins un choix\n- Algorithmes qui nécessitent une première exécution obligatoire\n\n### Différence entre while et do-while\n\nLa principale différence est que do-while garantit au moins une exécution du bloc de code, tandis que while vérifie la condition avant même la première exécution."
      },
      {
        "index": 6,
        "type": "code",
        "content": "## Exercice 3 : Validation d'entrée avec do-while\n\n### Objectif\nImplémentez une fonction qui simule la validation d'entrées utilisateur à l'aide d'une boucle do-while.\n\n### Instructions\n1. Implémentez la méthode `validateInput` qui prend un tableau d'entiers représentant les tentatives de l'utilisateur et une valeur cible\n2. Simulez une boucle do-while pour vérifier si l'utilisateur a entré la valeur correcte\n3. La fonction doit retourner true si la valeur cible est trouvée dans les tentatives, false sinon\n4. Même un tableau vide doit être traité correctement (retourner false)\n\n### Rappel sur la boucle do-while\nLa boucle do-while exécute le bloc d'instructions au moins une fois avant de vérifier la condition. Sa syntaxe est :\n```java\ndo {\n    // code à répéter\n} while (condition);\n```",
        "files": [
          {
            "content": "public class UserInputValidator {\n    public static boolean validateInput(int[] attempts, int targetValue) {\n        // TODO: Simuler une boucle do-while qui vérifie si l'utilisateur \n        // a entré la valeur correcte. La fonction prend un tableau des\n        // tentatives de l'utilisateur et retourne true si la valeur cible\n        // est trouvée, false sinon.\n        return false;\n    }\n}",
            "filename": "UserInputValidator.java",
            "language": "java",
            "type": "file"
          },
          {
            "content": "import org.junit.Test;\nimport static org.junit.Assert.*;\n\npublic class UserInputValidatorTest {\n    @Test\n    public void testValidateInput() {\n        assertTrue(UserInputValidator.validateInput(new int[]{5, 8, 10}, 10));\n        assertTrue(UserInputValidator.validateInput(new int[]{10}, 10));\n        assertFalse(UserInputValidator.validateInput(new int[]{5, 8, 12}, 10));\n        assertFalse(UserInputValidator.validateInput(new int[]{}, 10));\n    }\n}",
            "filename": "UserInputValidatorTest.java",
            "language": "java",
            "type": "test"
          }
        ]
      },
      {
        "index": 7,
        "type": "text",
        "content": "## Contrôle du flux d'exécution dans les boucles\n\nJava fournit des instructions spéciales pour contrôler le flux d'exécution à l'intérieur des boucles :\n\n### L'instruction break\n\nL'instruction `break` permet de sortir immédiatement d'une boucle, quelle que soit la condition de la boucle.\n\n```java\n// Exemple : Sortir de la boucle quand i est égal à 3\nfor (int i = 0; i < 10; i++) {\n    System.out.println(i);\n    if (i == 3) {\n        System.out.println(\"Break rencontré, sortie de la boucle\");\n        break;\n    }\n}\n// Affiche : 0, 1, 2, 3, \"Break rencontré, sortie de la boucle\"\n```\n\nUtilisez `break` lorsque vous avez trouvé ce que vous cherchiez et qu'il est inutile de continuer à itérer.\n\n### L'instruction continue\n\nL'instruction `continue` permet de passer directement à l'itération suivante en sautant le reste du code dans l'itération actuelle.\n\n```java\n// Exemple : Afficher uniquement les nombres pairs\nfor (int i = 0; i < 10; i++) {\n    if (i % 2 != 0) { // Si i est impair\n        continue; // Passer à l'itération suivante\n    }\n    System.out.println(i);\n}\n// Affiche : 0, 2, 4, 6, 8\n```\n\nUtilisez `continue` lorsque vous souhaitez ignorer certaines valeurs ou conditions sans sortir complètement de la boucle.\n\n### Boucles imbriquées et étiquettes\n\nDans le cas de boucles imbriquées, `break` et `continue` s'appliquent par défaut à la boucle la plus interne. Pour cibler une boucle externe, Java permet d'utiliser des étiquettes :\n\n```java\nouterLoop: for (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        if (i == 1 && j == 1) {\n            break outerLoop; // Sort complètement des deux boucles\n        }\n        System.out.println(\"i = \" + i + \", j = \" + j);\n    }\n}\n```\n\n### Conseils d'utilisation\n\n- Utilisez `break` avec modération pour préserver la lisibilité du code\n- Préférez des conditions de boucle claires plutôt que de multiples instructions `break`\n- Utilisez `continue` pour simplifier la logique conditionnelle à l'intérieur des boucles"
      },
      {
        "index": 8,
        "type": "code",
        "content": "## Exercice 4 : Utilisation de break et continue\n\n### Objectif\nMettez en pratique l'utilisation des instructions break et continue pour contrôler le flux d'exécution dans les boucles.\n\n### Instructions\n1. Implémentez la méthode `sumUntilNegative` qui calcule la somme des nombres positifs jusqu'à rencontrer un nombre négatif\n2. Implémentez la méthode `sumEvenNumbers` qui calcule la somme des nombres pairs uniquement\n3. Utilisez break dans la première méthode et continue dans la seconde\n\n### Rappel sur break et continue\n- **break** : sort complètement de la boucle\n- **continue** : passe directement à l'itération suivante en sautant le reste du code dans l'itération actuelle",
        "files": [
          {
            "content": "public class LoopController {\n    public static int sumUntilNegative(int[] numbers) {\n        // TODO: Calculer la somme des nombres positifs jusqu'à rencontrer\n        // un nombre négatif (utiliser break pour sortir de la boucle)\n        return 0;\n    }\n    \n    public static int sumEvenNumbers(int[] numbers) {\n        // TODO: Calculer la somme des nombres pairs uniquement\n        // (utiliser continue pour ignorer les nombres impairs)\n        return 0;\n    }\n}",
            "filename": "LoopController.java",
            "language": "java",
            "type": "file"
          },
          {
            "content": "import org.junit.Test;\nimport static org.junit.Assert.*;\n\npublic class LoopControllerTest {\n    @Test\n    public void testSumUntilNegative() {\n        assertEquals(12, LoopController.sumUntilNegative(new int[]{3, 5, 4, -2, 7}));\n        assertEquals(0, LoopController.sumUntilNegative(new int[]{-1, 2, 3}));\n        assertEquals(10, LoopController.sumUntilNegative(new int[]{10}));\n    }\n    \n    @Test\n    public void testSumEvenNumbers() {\n        assertEquals(6, LoopController.sumEvenNumbers(new int[]{1, 2, 3, 4}));\n        assertEquals(0, LoopController.sumEvenNumbers(new int[]{1, 3, 5}));\n        assertEquals(12, LoopController.sumEvenNumbers(new int[]{2, 4, 6}));\n    }\n}",
            "filename": "LoopControllerTest.java",
            "language": "java",
            "type": "test"
          }
        ]
      },
      {
        "index": 9,
        "type": "text",
        "content": "## Comparaison des différents types de boucles\n\nVoici un tableau récapitulatif pour vous aider à choisir le type de boucle le plus approprié selon votre situation :\n\n| Type de boucle | Quand l'utiliser | Avantages | Inconvénients |\n|---------------|-----------------|-----------|---------------|\n| **for** | Nombre d'itérations connu à l'avance | - Syntaxe compacte<br>- Variable d'itération locale au bloc<br>- Facilite la lecture pour les itérations comptées | - Moins adapté quand la condition d'arrêt n'est pas liée à un compteur |\n| **while** | Nombre d'itérations inconnu, dépendant d'une condition | - Flexible pour des conditions d'arrêt complexes<br>- Idéal pour les entrées utilisateur ou les recherches | - Risque de boucle infinie si la condition n'est jamais fausse |\n| **do-while** | Au moins une exécution nécessaire avant de tester la condition | - Garantit une première exécution<br>- Pratique pour les validations d'entrées | - Peut exécuter le code une fois même si la condition est déjà fausse |\n\n### Conseils pour choisir la bonne boucle\n\n1. Utilisez **for** quand :\n   - Vous comptez un nombre précis d'itérations\n   - Vous parcourez un tableau ou une collection avec un indice\n\n2. Utilisez **while** quand :\n   - La condition d'arrêt dépend de facteurs externes\n   - Le nombre d'itérations n'est pas prévisible\n\n3. Utilisez **do-while** quand :\n   - Vous avez besoin d'au moins une exécution garantie\n   - Vous validez des entrées utilisateur\n\n### Exemples de cas pratiques\n\n```java\n// Parcourir un tableau - utilisez for\nint[] numbers = {1, 2, 3, 4, 5};\nfor (int i = 0; i < numbers.length; i++) {\n    System.out.println(numbers[i]);\n}\n\n// Attendre une condition externe - utilisez while\nwhile (!isDataReady()) {\n    waitForData();\n}\n\n// Afficher un menu et obtenir un choix valide - utilisez do-while\nint choice;\ndo {\n    displayMenu();\n    choice = getChoice();\n} while (!isValidChoice(choice));\n```\n\nLe choix de la boucle appropriée améliore la lisibilité de votre code et reflète clairement votre intention."
      },
      {
        "index": 10,
        "type": "code",
        "content": "## Exercice 5 : Choix de la boucle appropriée\n\n### Objectif\nImplémentez trois méthodes différentes, chacune utilisant le type de boucle le plus approprié pour la tâche donnée.\n\n### Instructions\n1. Implémentez `calculateFactorial` en utilisant une boucle for pour calculer la factorielle d'un nombre\n2. Implémentez `findSubstringIndex` en utilisant une boucle while pour trouver l'index d'une sous-chaîne\n3. Implémentez `getValidInput` en utilisant une boucle do-while pour simuler la validation d'entrée\n\n### Rappel des différents types de boucles\n- **for** : idéal quand le nombre d'itérations est connu à l'avance\n- **while** : utile quand la condition d'arrêt dépend de facteurs variables\n- **do-while** : garantit au moins une exécution avant de vérifier la condition",
        "files": [
          {
            "content": "public class LoopSelector {\n    // Calcule la factorielle d'un nombre n (n!)\n    // Exemple : 5! = 5 * 4 * 3 * 2 * 1 = 120\n    public static long calculateFactorial(int n) {\n        // TODO: Utiliser une boucle for pour calculer la factorielle\n        return 0;\n    }\n    \n    // Trouve l'index de la première occurrence d'une sous-chaîne\n    // Retourne -1 si non trouvée\n    public static int findSubstringIndex(String text, String substring) {\n        // TODO: Utiliser une boucle while pour trouver l'index de la sous-chaîne\n        return -1;\n    }\n    \n    // Simule la validation d'une entrée en vérifiant si au moins une valeur\n    // dans le tableau attempts est dans la plage [min, max]\n    // Retourne la première valeur valide ou -1 si aucune n'est valide\n    public static int getValidInput(int[] attempts, int min, int max) {\n        // TODO: Utiliser une boucle do-while pour trouver la première entrée valide\n        return -1;\n    }\n}",
            "filename": "LoopSelector.java",
            "language": "java",
            "type": "file"
          },
          {
            "content": "import org.junit.Test;\nimport static org.junit.Assert.*;\n\npublic class LoopSelectorTest {\n    @Test\n    public void testCalculateFactorial() {\n        assertEquals(1, LoopSelector.calculateFactorial(0));\n        assertEquals(1, LoopSelector.calculateFactorial(1));\n        assertEquals(120, LoopSelector.calculateFactorial(5));\n        assertEquals(3628800, LoopSelector.calculateFactorial(10));\n    }\n    \n    @Test\n    public void testFindSubstringIndex() {\n        assertEquals(0, LoopSelector.findSubstringIndex(\"Hello World\", \"Hello\"));\n        assertEquals(6, LoopSelector.findSubstringIndex(\"Hello World\", \"World\"));\n        assertEquals(-1, LoopSelector.findSubstringIndex(\"Hello World\", \"Java\"));\n        assertEquals(7, LoopSelector.findSubstringIndex(\"Programming in Java\", \"in\"));\n    }\n    \n    @Test\n    public void testGetValidInput() {\n        assertEquals(5, LoopSelector.getValidInput(new int[]{5, 8, 3}, 1, 6));\n        assertEquals(-1, LoopSelector.getValidInput(new int[]{7, 8, 9}, 1, 6));\n        assertEquals(6, LoopSelector.getValidInput(new int[]{-3, 0, 6}, 1, 10));\n        assertEquals(-1, LoopSelector.getValidInput(new int[]{}, 1, 10));\n    }\n}",
            "filename": "LoopSelectorTest.java",
            "language": "java",
            "type": "test"
          }
        ]
      },
      {
        "index": 11,
        "type": "text",
        "content": "## Pour aller plus loin : La boucle for-each\n\nJava propose également une version simplifiée de la boucle for, appelée **for-each** ou **enhanced for loop**, particulièrement utile pour parcourir des collections sans avoir à gérer les indices.\n\n### Syntaxe de la boucle for-each\n\n```java\nfor (Type variable : collection) {\n    // bloc de code utilisant la variable\n}\n```\n\n### Exemple simple\n\n```java\n// Parcourir un tableau avec for-each\nint[] numbers = {1, 2, 3, 4, 5};\nfor (int number : numbers) {\n    System.out.println(number);\n}\n```\n\n### Avantages et limites\n\n**Avantages :**\n- Code plus lisible et concis\n- Élimine les erreurs potentielles liées aux indices\n- Parfait pour les simples itérations de tous les éléments\n\n**Limites :**\n- Ne permet pas de modifier les éléments de la collection (pour les types primitifs)\n- Ne donne pas accès à l'indice de l'élément courant\n- Ne permet pas de parcourir la collection dans l'ordre inverse ou de sauter des éléments\n\n### Exemple avec différents types de collections\n\n```java\n// Avec un tableau\nString[] names = {\"Alice\", \"Bob\", \"Charlie\"};\nfor (String name : names) {\n    System.out.println(\"Hello, \" + name);\n}\n\n// Avec une ArrayList\nimport java.util.ArrayList;\nimport java.util.List;\n\nList<String> fruits = new ArrayList<>();\nfruits.add(\"Apple\");\nfruits.add(\"Banana\");\nfruits.add(\"Cherry\");\n\nfor (String fruit : fruits) {\n    System.out.println(\"I like \" + fruit);\n}\n```\n\nLa boucle for-each est particulièrement recommandée lorsque vous avez simplement besoin de traiter chaque élément d'une collection sans vous soucier de sa position."
      }
    ],
    "date_update": new Date()
},
{
  _id: UUID("660e8400-e29b-41d4-a716-446655440003"),
  name: "Les bases de l'addition en Python",
  description: "Apprendre à effectuer des additions en Python",
  type: "langage",
  content: [
    {
      "index": 0,
      "type": "text",
      "content": "# L'addition en Python\n\nL'addition est une opération mathématique fondamentale en programmation. En Python, elle se réalise avec l'opérateur `+`.\n\n## Points clés :\n\n- L'opérateur `+` permet d'additionner des nombres\n- Python supporte l'addition de différents types numériques (entiers, décimaux)\n- Le résultat de l'addition suit les règles mathématiques classiques"
    },
    {
      index: 1,
      type: 'code',
      content: '## Addition simple\n\nCréez une fonction qui additionne deux nombres.\n\nPour ajouter deux nombres, utilisez l\'opérateur `+`.',
      files: [
        {
          content: "def add_numbers(a: int, b: int) -> int:\n    # TODO: Retourner la somme de a et b\n    pass",
          filename: 'Calculator.py',
          language: 'python',
          type: 'file'
        },
        {
          content: "import pytest\nfrom Calculator import add_numbers\n\n\ndef test_add_numbers():\n    assert add_numbers(2, 3) == 5, 'La somme de 2 + 3 devrait être 5'\n    assert add_numbers(0, 0) == 0, 'La somme de 0 + 0 devrait être 0'\n    assert add_numbers(-2, -3) == -5, 'La somme de -2 + -3 devrait être -5'",
          filename: 'CalculatorTest.py',
          language: 'python',
          type: 'test'
        }
      ]
    },
    {
      index: 2,
      "type": "quizz",
      "content": "Additions en Python",
      "questions": [
        {
          "question": "Quel est l'opérateur d'addition en Python ?",
          "options": [
            "+",
            "-",
            "/",
            "%"
          ],
          "correctAnswer": 0
        },
        {
          "question": "Quel est le résultat de 5 + 3 en Python ?",
          "options": [
            "53",
            "8",
            "2",
            "15"
          ],
          "correctAnswer": 1
        },
        {
          "question": "Comment additionner deux variables a et b en Python ?",
          "options": [
            "add(a,b)",
            "a plus b",
            "a + b",
            "a & b"
          ],
          "correctAnswer": 2
        },
        {
          "question": "Que fait l'opérateur += en Python ?",
          "options": [
            "Il soustrait puis assigne",
            "Il additionne puis assigne",
            "Il multiplie puis assigne",
            "Il compare deux valeurs"
          ],
          "correctAnswer": 1
        },
        {
          "question": "Quel est le résultat de '123' + '456' en Python ?",
          "options": [
            "579",
            "Erreur",
            "123456",
            "909"
          ],
          "correctAnswer": 2
        }
      ]
    }

  ],
  date_update: new Date()
},
  {
    _id: UUID("fd2f6102-3823-40b8-8aa9-08b19d8c4f88"),
    name: "Fonctions en Python",
    description: "Apprendre à créer et utiliser des fonctions pour organiser et réutiliser votre code",
    type: "langage",
    content: [
      {
        "index": 0,
        "type": "text",
        "content": "# Fonctions en Python\n\nLes fonctions sont des blocs de code réutilisables qui effectuent une tâche spécifique. Elles permettent d'organiser votre code, d'éviter la répétition et de rendre vos programmes plus modulaires et maintenables.\n\n## Avantages des fonctions\n\n- **Réutilisation du code** : Écrivez une fois, utilisez plusieurs fois\n- **Lisibilité** : Un code bien organisé est plus facile à comprendre\n- **Maintenabilité** : Des modifications localisées plutôt que dispersées\n- **Abstraction** : Masquer les détails d'implémentation complexes\n- **Modularité** : Diviser un grand problème en sous-problèmes gérables"
      },
      {
        "index": 1,
        "type": "text",
        "content": "# Cours 4.1 : Fonctions avec paramètres et retour\n\n## Définition d'une fonction\n\nLa syntaxe de base pour définir une fonction en Python est :\n\n```python\n  def nom_fonction(parametre1, parametre2, ...):\n    # Corps de la fonction\n    # Instructions à exécuter\n    return valeur_de_retour  # Optionnel\n```\n\n### Points importants :\n\n- Le mot-clé `def` indique le début d'une définition de fonction\n- Le nom de la fonction doit suivre les conventions de nommage Python (lettres, chiffres, soulignements, commençant par une lettre ou un soulignement)\n- Les parenthèses contiennent les paramètres (arguments) que la fonction accepte\n- Le corps de la fonction est indenté\n- Le mot-clé `return` spécifie la valeur que la fonction renvoie\n\n## Paramètres de fonction\n\nLes paramètres sont des variables qui reçoivent des valeurs lorsque la fonction est appelée :\n\n```python\ndef additionner(a, b):\n    return a + b\n\nresultat = additionner(5, 3)  # a reçoit 5, b reçoit 3\nprint(resultat)  # Affiche 8\n```\n\n## Valeur de retour\n\nLe mot-clé `return` permet à une fonction de renvoyer une valeur :\n\n- Une fonction peut renvoyer une valeur de n'importe quel type\n- Une fonction peut avoir plusieurs instructions `return` (mais une seule sera exécutée)\n- Sans instruction `return` explicite, une fonction renvoie `None`\n- `return` termine immédiatement l'exécution de la fonction\n\n```python\ndef est_pair(nombre):\n    if nombre % 2 == 0:\n        return True\n    else:\n        return False\n```"
      },
      {
        "index": 2,
        "type": "code",
        "content": "## Exercice 4.1 : Fonction puissance\n\nCréez une fonction `puissance(a, b)` qui retourne a élevé à la puissance b.",
        "files": [
          {
            "content": "def puissance(a, b):\n    \"\"\"Calcule a élevé à la puissance b.\n    \n    Args:\n        a (int/float): La base\n        b (int/float): L'exposant\n    \n    Returns:\n        float/int: Le résultat de a^b\n    \"\"\"\n    return a ** b\n\n# Exemples d'utilisation\ndef exemples_puissance():\n    print(f\"2^3 = {puissance(2, 3)}\")  # 8\n    print(f\"5^2 = {puissance(5, 2)}\")  # 25\n    print(f\"10^0 = {puissance(10, 0)}\")  # 1\n    print(f\"2^(-1) = {puissance(2, -1)}\")  # 0.5\n    \n    # Test avec des nombres décimaux\n    print(f\"1.5^2 = {puissance(1.5, 2)}\")  # 2.25\n    \n    return True\n\n# Appeler les exemples si le script est exécuté directement\nif __name__ == \"__main__\":\n    exemples_puissance()",
            "filename": "fonction_puissance.py",
            "language": "python",
            "type": "file"
          },
          {
            "content": "import pytest\nfrom fonction_puissance import puissance\n\n@pytest.mark.parametrize(\"a, b, expected\", [\n    (2, 3, 8),  # Cas de base\n    (5, 2, 25),  # Autre cas simple\n    (10, 0, 1),  # Exposant zéro\n    (2, -1, 0.5),  # Exposant négatif\n    (1.5, 2, 2.25),  # Nombre décimal\n    (0, 5, 0),  # Base zéro\n    (1, 100, 1),  # Exposant grand\n    (3, 3, 27)  # Autre test\n])\n  \n def test_puissance(a, b, expected):\n    # Vérifier avec une tolérance pour les nombres décimaux\n    assert puissance(a, b) == pytest.approx(expected)\n\n@pytest.mark.parametrize(\"a, b\", [\n    (0, 0),  # Cas indéterminé\n])\n  \n def test_puissance_indetermine(a, b):\n    # 0^0 est généralement défini comme 1 en Python, mais c'est mathématiquement indéterminé\n    # On vérifie juste que la fonction ne lève pas d'exception\n    result = puissance(a, b)\n    assert result is not None",
            "filename": "fonction_puissanceTest.py",
            "language": "python",
            "type": "test"
          }
        ]
      },
      {
        "index": 3,
        "type": "text",
        "content": "# Cours 4.2 : Fonctions avec valeurs par défaut\n\n## Paramètres avec valeurs par défaut\n\nPython permet de définir des valeurs par défaut pour les paramètres. Si un argument n'est pas fourni lors de l'appel, la valeur par défaut est utilisée.\n\n```python\ndef afficher_info(nom, age=25, ville=\"Paris\"):\n    print(f\"{nom}, {age} ans, habite à {ville}\")\n\n# Différentes façons d'appeler cette fonction\nafficher_info(\"Alice\")  # Utilise les deux valeurs par défaut\nafficher_info(\"Bob\", 30)  # Utilise la valeur par défaut pour ville\nafficher_info(\"Charlie\", ville=\"Lyon\")  # Spécifie ville mais utilise l'âge par défaut\n```\n\n### Points importants :\n\n- Les paramètres avec valeurs par défaut doivent être placés après les paramètres sans valeur par défaut\n- Les valeurs par défaut sont évaluées une seule fois, lors de la définition de la fonction\n- Vous pouvez spécifier des arguments nommés lors de l'appel pour plus de clarté\n\n## Arguments nommés\n\nVous pouvez spécifier les arguments par leur nom lors de l'appel d'une fonction :\n\n```python\ndef decrire_personne(nom, age, profession):\n    return f\"{nom} est un(e) {profession} de {age} ans\"\n\n# Ces deux appels sont équivalents\ndecrire_personne(\"Alice\", 30, \"ingénieure\")\ndecrire_personne(nom=\"Alice\", age=30, profession=\"ingénieure\")\n\n# Les arguments nommés peuvent être dans n'importe quel ordre\ndecrire_personne(profession=\"médecin\", nom=\"Bob\", age=45)\n```"
      },
      {
        "index": 4,
        "type": "code",
        "content": "## Exercice 4.2 : Fonction de salutation\n\nCréez une fonction `saluer(nom, message=\"Bonjour\")` qui affiche un message de salutation.",
        "files": [
          {
            "content": "def saluer(nom, message=\"Bonjour\"):\n    \"\"\"Affiche un message de salutation personnalisé.\n    \n    Args:\n        nom (str): Le nom de la personne à saluer\n        message (str, optional): Le message de salutation. Par défaut \"Bonjour\"\n    \n    Returns:\n        str: Le message de salutation complet\n    \"\"\"\n    salutation = f\"{message} {nom}!\"\n    print(salutation)\n    return salutation\n\n# Exemples d'utilisation\ndef exemples_salutation():\n    saluer(\"Alice\")  # Utilise le message par défaut\n    saluer(\"Bob\", \"Salut\")  # Message personnalisé\n    saluer(message=\"Bienvenue\", nom=\"Charlie\")  # Avec arguments nommés\n    \n    return True\n\n# Appeler les exemples si le script est exécuté directement\nif __name__ == \"__main__\":\n    exemples_salutation()",
            "filename": "fonction_salutation.py",
            "language": "python",
            "type": "file"
          },
          {
            "content": "import pytest\nfrom fonction_salutation import saluer\n\n  \n def test_saluer_message_defaut(capsys):\n    # Tester avec le message par défaut\n    resultat = saluer(\"Alice\")\n    \n    # Vérifier la valeur de retour\n    assert resultat == \"Bonjour Alice!\"\n    \n    # Vérifier la sortie console\n    captured = capsys.readouterr()\n    assert \"Bonjour Alice!\" in captured.out\n\n  \n def test_saluer_message_personnalise(capsys):\n    # Tester avec un message personnalisé\n    resultat = saluer(\"Bob\", \"Salut\")\n    \n    # Vérifier la valeur de retour\n    assert resultat == \"Salut Bob!\"\n    \n    # Vérifier la sortie console\n    captured = capsys.readouterr()\n    assert \"Salut Bob!\" in captured.out\n\n  \n def test_saluer_arguments_nommes(capsys):\n    # Tester avec des arguments nommés\n    resultat = saluer(message=\"Bienvenue\", nom=\"Charlie\")\n    \n    # Vérifier la valeur de retour\n    assert resultat == \"Bienvenue Charlie!\"\n    \n    # Vérifier la sortie console\n    captured = capsys.readouterr()\n    assert \"Bienvenue Charlie!\" in captured.out",
            "filename": "fonction_salutationTest.py",
            "language": "python",
            "type": "test"
          }
        ]
      },
      {
        "index": 5,
        "type": "code",
        "content": "## Exercice bonus : Fonction avec plusieurs paramètres par défaut\n\nCréez une fonction pour formater des informations de contact avec plusieurs paramètres par défaut.",
        "files": [
          {
            "content": "def formater_contact(nom, prenom, telephone=None, email=None, adresse=None):\n    \"\"\"Formate les informations de contact d'une personne.\n    \n    Args:\n        nom (str): Nom de famille\n        prenom (str): Prénom\n        telephone (str, optional): Numéro de téléphone\n        email (str, optional): Adresse email\n        adresse (str, optional): Adresse postale\n    \n    Returns:\n        str: Texte formaté avec les informations de contact disponibles\n    \"\"\"\n    # Commencer par le nom complet\n    contact_info = f\"{prenom} {nom.upper()}\"\n    \n    # Ajouter les informations supplémentaires disponibles\n    if telephone:\n        contact_info += f\"\\nTél: {telephone}\"\n        \n    if email:\n        contact_info += f\"\\nEmail: {email}\"\n        \n    if adresse:\n        contact_info += f\"\\nAdresse: {adresse}\"\n    \n    print(contact_info)\n    return contact_info\n\n# Exemples d'utilisation\ndef exemples_contact():\n    # Avec seulement les informations obligatoires\n    formater_contact(\"Dupont\", \"Jean\")\n    \n    print(\"\\n---\\n\")  # Séparateur\n    \n    # Avec toutes les informations\n    formater_contact(\n        \"Martin\", \n        \"Sophie\", \n        telephone=\"01 23 45 67 89\", \n        email=\"sophie.martin@exemple.com\", \n        adresse=\"123 rue de Paris, 75001 Paris\"\n    )\n    \n    print(\"\\n---\\n\")  # Séparateur\n    \n    # Avec certaines informations optionnelles seulement\n    formater_contact(\"Durand\", \"Paul\", email=\"paul.durand@exemple.com\")\n    \n    return True\n\n# Appeler les exemples si le script est exécuté directement\nif __name__ == \"__main__\":\n    exemples_contact()",
            "filename": "fonction_contact.py",
            "language": "python",
            "type": "file"
          },
          {
            "content": "import pytest\nfrom fonction_contact import formater_contact\n\n  \n def test_formater_contact_minimal(capsys):\n    # Tester avec seulement les informations obligatoires\n    resultat = formater_contact(\"Dupont\", \"Jean\")\n    \n    # Vérifier la valeur de retour\n    assert resultat == \"Jean DUPONT\"\n    assert \"Tél:\" not in resultat\n    \n    # Vérifier la sortie console\n    captured = capsys.readouterr()\n    assert \"Jean DUPONT\" in captured.out\n\n  \n  def test_formater_contact_complet(capsys):\n    # Tester avec toutes les informations\n    resultat = formater_contact(\n        \"Martin\", \n        \"Sophie\", \n        telephone=\"01 23 45 67 89\", \n        email=\"sophie.martin@exemple.com\", \n        adresse=\"123 rue de Paris, 75001 Paris\"\n    )\n    \n    # Vérifier la valeur de retour\n    assert \"Sophie MARTIN\" in resultat\n    assert \"Tél: 01 23 45 67 89\" in resultat\n    assert \"Email: sophie.martin@exemple.com\" in resultat\n    assert \"Adresse: 123 rue de Paris, 75001 Paris\" in resultat\n    \n    # Vérifier la sortie console\n    captured = capsys.readouterr()\n    assert \"Sophie MARTIN\" in captured.out\n    assert \"Tél: 01 23 45 67 89\" in captured.out\n\n  \n def test_formater_contact_partiel(capsys):\n    # Tester avec certaines informations optionnelles seulement\n    resultat = formater_contact(\"Durand\", \"Paul\", email=\"paul.durand@exemple.com\")\n    \n    # Vérifier la valeur de retour\n    assert \"Paul DURAND\" in resultat\n    assert \"Email: paul.durand@exemple.com\" in resultat\n    assert \"Tél:\" not in resultat\n    assert \"Adresse:\" not in resultat\n    \n    # Vérifier la sortie console\n    captured = capsys.readouterr()\n    assert \"Paul DURAND\" in captured.out\n    assert \"Email: paul.durand@exemple.com\" in captured.out",
            "filename": "fonction_contactTest.py",
            "language": "python",
            "type": "test"
          }
        ]
      }
    ],
    date_update: new Date()
  },
  {
    "_id": UUID("aec53a95-cc7c-4632-977c-50aca2454f60"),
    "name": "Les listes chaînées en Java",
    "description": "Comprendre et implémenter une liste chaînée simple en Java",
    "type": "algorithmes",
    "content": [
      {
        "index": 0,
        "type": "text",
        "content": "# Les listes chaînées en Java\n\nUne liste chaînée est une structure de données linéaire composée de nœuds, où chaque nœud contient une donnée et une référence vers le nœud suivant.\n\n## Points clés :\n\n- Structure dynamique (taille variable)\n- Insertion et suppression efficaces (O(1) si on connaît le nœud)\n- Accès séquentiel (O(n) dans le pire des cas)\n- Implémentation à l'aide de classes Node et LinkedList"
      },
      {
        "index": 1,
        "type": "code",
        "content": "## Implémentation d'une liste chaînée\n\nCréez une classe `Node` et une classe `LinkedList` pour implémenter une liste chaînée simple.\n\nLa classe LinkedList doit implémenter les méthodes suivantes :\n- `add(int value)` : ajoute un élément à la fin de la liste\n- `get(int index)` : retourne l'élément à l'index spécifié\n- `size()` : retourne la taille de la liste",
        "files": [
          {
            "content": "public class Node {\n    private int data;\n    private Node next;\n    \n    public Node(int data) {\n        this.data = data;\n        this.next = null;\n    }\n    \n    public int getData() {\n        return data;\n    }\n    \n    public void setData(int data) {\n        this.data = data;\n    }\n    \n    public Node getNext() {\n        return next;\n    }\n    \n    public void setNext(Node next) {\n        this.next = next;\n    }\n}\n\npublic class LinkedList {\n    private Node head;\n    private int size;\n    \n    public LinkedList() {\n        this.head = null;\n        this.size = 0;\n    }\n    \n    public void add(int value) {\n        // TODO: Ajouter un nouvel élément à la fin de la liste\n        // Créer un nouveau nœud avec la valeur donnée\n        // Si la liste est vide, le nouveau nœud devient la tête\n        // Sinon, parcourir la liste jusqu'au dernier nœud et l'attacher\n        // N'oubliez pas d'incrémenter la taille\n        pass;\n    }\n    \n    public int get(int index) {\n        // TODO: Retourner l'élément à l'index spécifié\n        // Vérifier si l'index est valide\n        // Parcourir la liste jusqu'à l'index et retourner la valeur\n        return 0;\n    }\n    \n    public int size() {\n        // TODO: Retourner la taille de la liste\n        return 0;\n    }\n}",
            "filename": "LinkedList.java",
            "language": "java",
            "type": "file"
          },
          {
            "content": "import org.junit.Test;\nimport static org.junit.Assert.*;\n\npublic class LinkedListTest {\n    @Test\n    public void testEmptyList() {\n        LinkedList list = new LinkedList();\n        assertEquals(0, list.size());\n    }\n    \n    @Test\n    public void testAddOneElement() {\n        LinkedList list = new LinkedList();\n        list.add(10);\n        assertEquals(1, list.size());\n        assertEquals(10, list.get(0));\n    }\n    \n    @Test\n    public void testAddMultipleElements() {\n        LinkedList list = new LinkedList();\n        list.add(10);\n        list.add(20);\n        list.add(30);\n        assertEquals(3, list.size());\n        assertEquals(10, list.get(0));\n        assertEquals(20, list.get(1));\n        assertEquals(30, list.get(2));\n    }\n    \n    @Test(expected = IndexOutOfBoundsException.class)\n    public void testGetInvalidIndex() {\n        LinkedList list = new LinkedList();\n        list.add(10);\n        list.get(1); // Devrait lancer une exception\n    }\n}",
            "filename": "LinkedListTest.java",
            "language": "java",
            "type": "test"
          }
        ]
      }
    ],
    "date_update": new Date()
  },
  {
    "_id": UUID("aec53a95-cc7c-4632-977c-50aca2454f61"),
    "name": "Implémentation d'un tri à bulles en Java",
    "description": "Apprendre à implémenter l'algorithme de tri à bulles et comprendre sa complexité",
    "type": "algorithmes",
    "content": [
      {
        "index": 0,
        "type": "text",
        "content": "# Le tri à bulles en Java\n\nLe tri à bulles est un algorithme de tri simple qui parcourt plusieurs fois un tableau, compare les éléments adjacents et les échange si nécessaire.\n\n## Points clés :\n\n- Algorithme simple à implémenter\n- Complexité temporelle : O(n²) dans le pire et cas moyen\n- Complexité spatiale : O(1) (tri en place)\n- Stable (préserve l'ordre des éléments égaux)\n- Inefficace pour les grands tableaux"
      },
      {
        "index": 1,
        "type": "code",
        "content": "## Implémentation du tri à bulles\n\nCréez une classe `BubbleSort` qui implémente l'algorithme de tri à bulles.\n\nLa méthode `sort(int[] array)` doit trier le tableau en place.",
        "files": [
          {
            "content": "public class BubbleSort {\n    \n    /**\n     * Trie un tableau d'entiers en utilisant l'algorithme du tri à bulles\n     * @param array Le tableau à trier\n     */\n    public void sort(int[] array) {\n        // TODO: Implémenter l'algorithme de tri à bulles\n        // 1. Parcourir le tableau plusieurs fois\n        // 2. À chaque parcours, comparer les éléments adjacents\n        // 3. Échanger les éléments si celui de gauche est plus grand que celui de droite\n        // 4. Optimisation possible : arrêter si aucun échange n'a été effectué lors d'un parcours\n    }\n    \n    /**\n     * Échange deux éléments dans un tableau\n     * @param array Le tableau contenant les éléments\n     * @param i L'index du premier élément\n     * @param j L'index du second élément\n     */\n    private void swap(int[] array, int i, int j) {\n        // TODO: Échanger les éléments aux indices i et j dans le tableau\n    }\n}",
            "filename": "BubbleSort.java",
            "language": "java",
            "type": "file"
          },
          {
            "content": "import org.junit.Test;\nimport static org.junit.Assert.*;\n\npublic class BubbleSortTest {\n    \n    @Test\n    public void testEmptyArray() {\n        int[] array = {};\n        BubbleSort sorter = new BubbleSort();\n        sorter.sort(array);\n        assertArrayEquals(new int[]{}, array);\n    }\n    \n    @Test\n    public void testSingleElement() {\n        int[] array = {5};\n        BubbleSort sorter = new BubbleSort();\n        sorter.sort(array);\n        assertArrayEquals(new int[]{5}, array);\n    }\n    \n    @Test\n    public void testSortedArray() {\n        int[] array = {1, 2, 3, 4, 5};\n        BubbleSort sorter = new BubbleSort();\n        sorter.sort(array);\n        assertArrayEquals(new int[]{1, 2, 3, 4, 5}, array);\n    }\n    \n    @Test\n    public void testReverseSortedArray() {\n        int[] array = {5, 4, 3, 2, 1};\n        BubbleSort sorter = new BubbleSort();\n        sorter.sort(array);\n        assertArrayEquals(new int[]{1, 2, 3, 4, 5}, array);\n    }\n    \n    @Test\n    public void testRandomArray() {\n        int[] array = {3, 1, 4, 1, 5, 9, 2, 6, 5};\n        BubbleSort sorter = new BubbleSort();\n        sorter.sort(array);\n        assertArrayEquals(new int[]{1, 1, 2, 3, 4, 5, 5, 6, 9}, array);\n    }\n}",
            "filename": "BubbleSortTest.java",
            "language": "java",
            "type": "test"
          }
        ]
      }
    ],
    "date_update": new Date()
  },
  {
    "_id": UUID("6f7f7aeb-bcd0-4d2b-b8ce-9d483da11156"),
    "name": "Les principes de l'héritage en Java",
    "description": "Comprendre et mettre en pratique le concept d'héritage dans la POO Java",
    "type": "poo",
    "content": [
      {
        "index": 0,
        "type": "text",
        "content": "# L'héritage en Java\n\nL'héritage est un concept fondamental de la programmation orientée objet qui permet à une classe d'acquérir les propriétés (attributs et méthodes) d'une autre classe.\n\n## Points clés :\n\n- Mot-clé `extends` pour créer une relation d'héritage\n- Une classe fille (sous-classe) hérite des membres non-privés de sa classe mère (super-classe)\n- Le mot-clé `super` permet d'accéder aux membres de la classe parente\n- L'héritage favorise la réutilisation du code et établit une relation \"est un\"\n- Java supporte l'héritage simple (une classe ne peut hériter que d'une seule classe)"
      },
      {
        "index": 1,
        "type": "code",
        "content": "## Implémentation de l'héritage\n\nCréez une hiérarchie de classes pour représenter des formes géométriques. Vous devez implémenter une classe abstraite `Shape` et deux classes concrètes `Circle` et `Rectangle`.",
        "files": [
          {
            "content": "/**\n * Classe abstraite représentant une forme géométrique\n */\npublic abstract class Shape {\n    private String color;\n    \n    public Shape(String color) {\n        this.color = color;\n    }\n    \n    public String getColor() {\n        return color;\n    }\n    \n    public void setColor(String color) {\n        this.color = color;\n    }\n    \n    /**\n     * Méthode abstraite pour calculer l'aire de la forme\n     * @return l'aire de la forme\n     */\n    public abstract double calculateArea();\n    \n    /**\n     * Méthode abstraite pour calculer le périmètre de la forme\n     * @return le périmètre de la forme\n     */\n    public abstract double calculatePerimeter();\n    \n    /**\n     * Retourne une description de la forme\n     * @return chaîne décrivant la forme\n     */\n    public String getDescription() {\n        return \"Je suis une forme de couleur \" + color;\n    }\n}",
            "filename": "Shape.java",
            "language": "java",
            "type": "file"
          },
          {
            "content": "/**\n * Classe représentant un cercle\n */\npublic class Circle extends Shape {\n    private double radius;\n    \n    // TODO: Créer un constructeur qui initialise la couleur et le rayon\n    \n    public double getRadius() {\n        return radius;\n    }\n    \n    public void setRadius(double radius) {\n        this.radius = radius;\n    }\n    \n    // TODO: Implémenter la méthode calculateArea() pour calculer l'aire du cercle (π × r²)\n    \n    // TODO: Implémenter la méthode calculatePerimeter() pour calculer le périmètre du cercle (2 × π × r)\n    \n    // TODO: Redéfinir la méthode getDescription() pour inclure des informations sur le rayon\n}",
            "filename": "Circle.java",
            "language": "java",
            "type": "file"
          },
          {
            "content": "/**\n * Classe représentant un rectangle\n */\npublic class Rectangle extends Shape {\n    private double width;\n    private double height;\n    \n    // TODO: Créer un constructeur qui initialise la couleur, la largeur et la hauteur\n    \n    public double getWidth() {\n        return width;\n    }\n    \n    public void setWidth(double width) {\n        this.width = width;\n    }\n    \n    public double getHeight() {\n        return height;\n    }\n    \n    public void setHeight(double height) {\n        this.height = height;\n    }\n    \n    // TODO: Implémenter la méthode calculateArea() pour calculer l'aire du rectangle (largeur × hauteur)\n    \n    // TODO: Implémenter la méthode calculatePerimeter() pour calculer le périmètre du rectangle (2 × (largeur + hauteur))\n    \n    // TODO: Redéfinir la méthode getDescription() pour inclure des informations sur la largeur et la hauteur\n}",
            "filename": "Rectangle.java",
            "language": "java",
            "type": "file"
          },
          {
            "content": "import org.junit.Test;\nimport static org.junit.Assert.*;\n\npublic class ShapeTest {\n    \n    @Test\n    public void testCircleArea() {\n        Circle circle = new Circle(\"rouge\", 5.0);\n        assertEquals(78.54, circle.calculateArea(), 0.01);\n    }\n    \n    @Test\n    public void testCirclePerimeter() {\n        Circle circle = new Circle(\"bleu\", 5.0);\n        assertEquals(31.42, circle.calculatePerimeter(), 0.01);\n    }\n    \n    @Test\n    public void testRectangleArea() {\n        Rectangle rectangle = new Rectangle(\"vert\", 4.0, 5.0);\n        assertEquals(20.0, rectangle.calculateArea(), 0.01);\n    }\n    \n    @Test\n    public void testRectanglePerimeter() {\n        Rectangle rectangle = new Rectangle(\"jaune\", 4.0, 5.0);\n        assertEquals(18.0, rectangle.calculatePerimeter(), 0.01);\n    }\n    \n    @Test\n    public void testShapeInheritance() {\n        Shape circle = new Circle(\"rouge\", 5.0);\n        Shape rectangle = new Rectangle(\"vert\", 4.0, 5.0);\n        \n        assertTrue(circle instanceof Shape);\n        assertTrue(rectangle instanceof Shape);\n        \n        assertNotEquals(circle.getDescription(), rectangle.getDescription());\n        assertEquals(\"rouge\", circle.getColor());\n        assertEquals(\"vert\", rectangle.getColor());\n    }\n}",
            "filename": "ShapeTest.java",
            "language": "java",
            "type": "test"
          }
        ]
      }
    ],
    "date_update": new Date()
  },
  {
    "_id": UUID("6f7f7aeb-bcd0-4d2b-b8ce-9d483da11155"),
    "name": "Encapsulation et polymorphisme en Java",
    "description": "Maîtriser les concepts d'encapsulation et de polymorphisme dans la POO Java",
    "type": "poo",
    "content": [
      {
        "index": 0,
        "type": "text",
        "content": "# Encapsulation et polymorphisme en Java\n\nL'encapsulation et le polymorphisme sont deux piliers essentiels de la programmation orientée objet en Java.\n\n## Encapsulation\nL'encapsulation consiste à regrouper les données et les méthodes qui les manipulent au sein d'une même unité (la classe) et à restreindre l'accès direct aux données via les modificateurs d'accès.\n\n- Utilisation des modificateurs `private`, `protected`, `public`\n- Création de getters/setters pour contrôler l'accès aux attributs\n- Protection des données contre les modifications accidentelles\n\n## Polymorphisme\nLe polymorphisme permet à un objet de prendre plusieurs formes. En Java, il se manifeste principalement par :\n\n- La redéfinition de méthodes (override)\n- La surcharge de méthodes (overload)\n- L'utilisation de références de type parent pour manipuler des objets de type enfant"
      },
      {
        "index": 1,
        "type": "code",
        "content": "## Mise en pratique de l'encapsulation et du polymorphisme\n\nCréez un système simple de gestion d'employés qui démontre l'encapsulation et le polymorphisme.",
        "files": [
          {
            "content": "/**\n * Classe de base représentant un employé\n */\npublic class Employee {\n    private String name;\n    private int id;\n    protected double baseSalary;\n    \n    public Employee(String name, int id, double baseSalary) {\n        this.name = name;\n        this.id = id;\n        this.baseSalary = baseSalary;\n    }\n    \n    // Getters et setters (encapsulation)\n    public String getName() {\n        return name;\n    }\n    \n    public void setName(String name) {\n        this.name = name;\n    }\n    \n    public int getId() {\n        return id;\n    }\n    \n    // L'ID ne peut pas être modifié après création (encapsulation)\n    \n    public double getBaseSalary() {\n        return baseSalary;\n    }\n    \n    public void setBaseSalary(double baseSalary) {\n        this.baseSalary = baseSalary;\n    }\n    \n    /**\n     * Calcule le salaire de l'employé\n     * @return le salaire calculé\n     */\n    public double calculateSalary() {\n        return baseSalary;\n    }\n    \n    /**\n     * Retourne une description de l'employé\n     * @return la description\n     */\n    public String getDescription() {\n        return \"Employé: \" + name + \" (ID: \" + id + \"), Salaire de base: \" + baseSalary;\n    }\n}",
            "filename": "Employee.java",
            "language": "java",
            "type": "file"
          },
          {
            "content": "/**\n * Classe représentant un manager, qui est un type d'employé\n */\npublic class Manager extends Employee {\n    private double bonus;\n    \n    // TODO: Créer un constructeur qui initialise le nom, l'ID, le salaire de base et le bonus\n    \n    // TODO: Créer des getters et setters pour le bonus (encapsulation)\n    \n    // TODO: Redéfinir la méthode calculateSalary() pour ajouter le bonus au salaire de base\n    \n    // TODO: Redéfinir la méthode getDescription() pour inclure les informations sur le bonus\n}",
            "filename": "Manager.java",
            "language": "java",
            "type": "file"
          },
          {
            "content": "/**\n * Classe représentant un développeur, qui est un type d'employé\n */\npublic class Developer extends Employee {\n    private String programmingLanguage;\n    private double overtimeHours;\n    private double hourlyRate;\n    \n    // TODO: Créer un constructeur qui initialise le nom, l'ID, le salaire de base, le langage de programmation, \n    // les heures supplémentaires et le taux horaire\n    \n    // TODO: Créer des getters et setters pour les attributs (encapsulation)\n    \n    // TODO: Redéfinir la méthode calculateSalary() pour ajouter la rémunération des heures supplémentaires au salaire de base\n    // (formule: salaire_base + heures_supp * taux_horaire)\n    \n    // TODO: Redéfinir la méthode getDescription() pour inclure les informations sur le langage de programmation\n}",
            "filename": "Developer.java",
            "language": "java",
            "type": "file"
          },
          {
            "content": "import org.junit.Test;\nimport static org.junit.Assert.*;\n\npublic class EmployeeTest {\n    \n    @Test\n    public void testEmployeeSalary() {\n        Employee employee = new Employee(\"John Doe\", 1001, 3000.0);\n        assertEquals(3000.0, employee.calculateSalary(), 0.01);\n    }\n    \n    @Test\n    public void testManagerSalary() {\n        Manager manager = new Manager(\"Jane Smith\", 2001, 5000.0, 1000.0);\n        assertEquals(6000.0, manager.calculateSalary(), 0.01);\n        assertTrue(manager.getDescription().contains(\"Bonus\"));\n    }\n    \n    @Test\n    public void testDeveloperSalary() {\n        Developer developer = new Developer(\"Bob Johnson\", 3001, 4000.0, \"Java\", 10.0, 25.0);\n        assertEquals(4250.0, developer.calculateSalary(), 0.01);\n        assertTrue(developer.getDescription().contains(\"Java\"));\n    }\n    \n    @Test\n    public void testPolymorphism() {\n        Employee[] employees = {\n            new Employee(\"John Doe\", 1001, 3000.0),\n            new Manager(\"Jane Smith\", 2001, 5000.0, 1000.0),\n            new Developer(\"Bob Johnson\", 3001, 4000.0, \"Java\", 10.0, 25.0)\n        };\n        \n        double totalSalary = 0;\n        for (Employee emp : employees) {\n            totalSalary += emp.calculateSalary(); // Polymorphisme - appel de la méthode appropriée selon le type\n        }\n        \n        assertEquals(13250.0, totalSalary, 0.01);\n    }\n    \n    @Test\n    public void testEncapsulation() {\n        Employee employee = new Employee(\"John Doe\", 1001, 3000.0);\n        \n        // Test des accesseurs et mutateurs\n        employee.setName(\"John Smith\");\n        assertEquals(\"John Smith\", employee.getName());\n        \n        // L'identifiant ne peut pas être modifié après création (pas de setter)\n        assertEquals(1001, employee.getId());\n        \n        employee.setBaseSalary(3500.0);\n        assertEquals(3500.0, employee.getBaseSalary(), 0.01);\n    }\n}",
            "filename": "EmployeeTest.java",
            "language": "java",
            "type": "test"
          }
        ]
      }
    ],
    "date_update": new Date()
  },
  {
    "_id": UUID("4865a0fe-6ac5-4110-b781-3ab9295fbfa8"),
    "name": "Classes et objets en Python",
    "description": "Comprendre les fondements de la POO en Python avec les classes et les objets",
    "type": "langage",
    "content": [
      {
        "index": 0,
        "type": "text",
        "content": "# Classes et objets en Python\n\nLa programmation orientée objet (POO) est un paradigme de programmation qui utilise les \"objets\" pour modéliser des entités du monde réel. En Python, tout est objet, et la POO se base sur les classes.\n\n## Points clés :\n\n- Une **classe** est un modèle (blueprint) pour créer des objets\n- Un **objet** est une instance d'une classe\n- Les **attributs** sont les variables appartenant à un objet\n- Les **méthodes** sont les fonctions définies dans une classe\n- La méthode `__init__` est utilisée pour initialiser les attributs lors de la création d'un objet\n- Le paramètre `self` fait référence à l'instance actuelle de la classe"
      },
      {
        "index": 1,
        "type": "code",
        "content": "## Création de classes en Python\n\nCréez une classe `Compte` qui représente un compte bancaire. Cette classe doit permettre de gérer un solde, de faire des dépôts et des retraits.",
        "files": [
          {
            "content": "class Compte:\n    \"\"\"Classe représentant un compte bancaire\"\"\"\n    \n    def __init__(self, titulaire, solde_initial=0):\n        \"\"\"Initialise un nouveau compte bancaire\n        \n        Args:\n            titulaire (str): Le nom du titulaire du compte\n            solde_initial (float, optional): Le solde initial du compte. Par défaut 0.\n        \"\"\"\n        # TODO: Initialiser les attributs titulaire et solde\n        pass\n    \n    def depot(self, montant):\n        \"\"\"Dépose un montant sur le compte\n        \n        Args:\n            montant (float): Le montant à déposer\n            \n        Returns:\n            float: Le nouveau solde du compte\n            \n        Raises:\n            ValueError: Si le montant est négatif\n        \"\"\"\n        # TODO: Vérifier que le montant est positif\n        # TODO: Ajouter le montant au solde et retourner le nouveau solde\n        pass\n    \n    def retrait(self, montant):\n        \"\"\"Retire un montant du compte\n        \n        Args:\n            montant (float): Le montant à retirer\n            \n        Returns:\n            float: Le nouveau solde du compte\n            \n        Raises:\n            ValueError: Si le montant est négatif ou supérieur au solde\n        \"\"\"\n        # TODO: Vérifier que le montant est positif\n        # TODO: Vérifier que le solde est suffisant\n        # TODO: Soustraire le montant du solde et retourner le nouveau solde\n        pass\n    \n    def afficher_info(self):\n        \"\"\"Affiche les informations du compte\n        \n        Returns:\n            str: Une chaîne de caractères décrivant le compte\n        \"\"\"\n        # TODO: Retourner une chaîne de caractères contenant les informations du compte\n        pass",
            "filename": "compte.py",
            "language": "python",
            "type": "file"
          },
          {
            "content": "import pytest\nfrom compte import Compte\n\n\ndef test_creation_compte():\n    compte = Compte(\"Jean Dupont\", 1000)\n    assert compte.titulaire == \"Jean Dupont\"\n    assert compte.solde == 1000\n\n\ndef test_depot():\n    compte = Compte(\"Jean Dupont\", 1000)\n    nouveau_solde = compte.depot(500)\n    assert nouveau_solde == 1500\n    assert compte.solde == 1500\n\n\ndef test_depot_montant_negatif():\n    compte = Compte(\"Jean Dupont\", 1000)\n    with pytest.raises(ValueError):\n        compte.depot(-500)\n\n\ndef test_retrait():\n    compte = Compte(\"Jean Dupont\", 1000)\n    nouveau_solde = compte.retrait(300)\n    assert nouveau_solde == 700\n    assert compte.solde == 700\n\n\ndef test_retrait_montant_superieur_solde():\n    compte = Compte(\"Jean Dupont\", 1000)\n    with pytest.raises(ValueError):\n        compte.retrait(1500)\n\n\ndef test_retrait_montant_negatif():\n    compte = Compte(\"Jean Dupont\", 1000)\n    with pytest.raises(ValueError):\n        compte.retrait(-500)\n\n\ndef test_afficher_info():\n    compte = Compte(\"Jean Dupont\", 1000)\n    info = compte.afficher_info()\n    assert \"Jean Dupont\" in info\n    assert \"1000\" in info",
            "filename": "compteTest.py",
            "language": "python",
            "type": "test"
          }
        ]
      }
    ],
    "date_update": new Date()
  },
  {
    "_id": UUID("4865a0fe-6ac5-4110-b781-3ab9295fbfa9"),
    "name": "Héritage et polymorphisme en Python",
    "description": "Maîtriser les concepts avancés de POO en Python avec l'héritage et le polymorphisme",
    "type": "langage",
    "content": [
      {
        "index": 0,
        "type": "text",
        "content": "# Héritage et polymorphisme en Python\n\nL'héritage et le polymorphisme sont deux concepts fondamentaux de la programmation orientée objet qui permettent de créer des hiérarchies de classes et de réutiliser du code.\n\n## Héritage\n\n- Permet à une classe (sous-classe) d'hériter des attributs et méthodes d'une autre classe (super-classe)\n- Favorise la réutilisation du code et établit une relation \"est un\"\n- Syntaxe en Python: `class SousClasse(SuperClasse):`\n- La fonction `super()` permet d'accéder aux méthodes de la classe parente\n\n## Polymorphisme\n\n- Permet à des objets de différentes classes d'être traités comme des objets d'une classe commune\n- Les méthodes peuvent être redéfinies dans les sous-classes pour fournir des comportements spécifiques\n- Python utilise le \"duck typing\": \"Si ça marche comme un canard et que ça fait coin-coin comme un canard, alors c'est probablement un canard\""
      },
      {
        "index": 1,
        "type": "code",
        "content": "## Implémentation de l'héritage et du polymorphisme\n\nCréez une hiérarchie de classes pour représenter différents types de véhicules. Vous devez implémenter une classe de base `Vehicule` et deux sous-classes: `Voiture` et `Moto`.",
        "files": [
          {
            "content": "class Vehicule:\n    \"\"\"Classe de base pour tous les véhicules\"\"\"\n    \n    def __init__(self, marque, modele, annee, vitesse_max):\n        \"\"\"Initialise un nouveau véhicule\n        \n        Args:\n            marque (str): La marque du véhicule\n            modele (str): Le modèle du véhicule\n            annee (int): L'année de fabrication\n            vitesse_max (float): La vitesse maximale en km/h\n        \"\"\"\n        self.marque = marque\n        self.modele = modele\n        self.annee = annee\n        self.vitesse_max = vitesse_max\n        self.vitesse_actuelle = 0\n    \n    def accelerer(self, increment):\n        \"\"\"Augmente la vitesse actuelle du véhicule\n        \n        Args:\n            increment (float): L'augmentation de vitesse en km/h\n            \n        Returns:\n            float: La nouvelle vitesse actuelle\n            \n        Raises:\n            ValueError: Si l'incrément est négatif\n        \"\"\"\n        if increment < 0:\n            raise ValueError(\"L'augmentation de vitesse doit être positive\")\n        \n        self.vitesse_actuelle = min(self.vitesse_actuelle + increment, self.vitesse_max)\n        return self.vitesse_actuelle\n    \n    def freiner(self, decrement):\n        \"\"\"Diminue la vitesse actuelle du véhicule\n        \n        Args:\n            decrement (float): La diminution de vitesse en km/h\n            \n        Returns:\n            float: La nouvelle vitesse actuelle\n            \n        Raises:\n            ValueError: Si le décrément est négatif\n        \"\"\"\n        if decrement < 0:\n            raise ValueError(\"La diminution de vitesse doit être positive\")\n        \n        self.vitesse_actuelle = max(self.vitesse_actuelle - decrement, 0)\n        return self.vitesse_actuelle\n    \n    def decrire(self):\n        \"\"\"Retourne une description du véhicule\n        \n        Returns:\n            str: Description du véhicule\n        \"\"\"\n        return f\"{self.marque} {self.modele} ({self.annee}), Vitesse actuelle: {self.vitesse_actuelle} km/h\"",
            "filename": "vehicule.py",
            "language": "python",
            "type": "file"
          },
          {
            "content": "from vehicule import Vehicule\n\nclass Voiture(Vehicule):\n    \"\"\"Classe représentant une voiture\"\"\"\n    \n    def __init__(self, marque, modele, annee, vitesse_max, nombre_portes, type_carburant):\n        \"\"\"Initialise une nouvelle voiture\n        \n        Args:\n            marque (str): La marque de la voiture\n            modele (str): Le modèle de la voiture\n            annee (int): L'année de fabrication\n            vitesse_max (float): La vitesse maximale en km/h\n            nombre_portes (int): Le nombre de portes\n            type_carburant (str): Le type de carburant (essence, diesel, électrique, etc.)\n        \"\"\"\n        # TODO: Appeler le constructeur de la classe parent\n        # TODO: Initialiser les attributs supplémentaires spécifiques à une voiture\n        pass\n    \n    def klaxonner(self):\n        \"\"\"Fait klaxonner la voiture\n        \n        Returns:\n            str: Le son du klaxon\n        \"\"\"\n        # TODO: Retourner une chaîne représentant le son du klaxon\n        pass\n    \n    def decrire(self):\n        \"\"\"Retourne une description détaillée de la voiture\n        \n        Returns:\n            str: Description de la voiture\n        \"\"\"\n        # TODO: Surcharger la méthode decrire de la classe parent pour inclure les informations spécifiques à une voiture\n        # Indice: utilisez super().decrire() pour récupérer la description de base\n        pass",
            "filename": "voiture.py",
            "language": "python",
            "type": "file"
          },
          {
            "content": "from vehicule import Vehicule\n\nclass Moto(Vehicule):\n    \"\"\"Classe représentant une moto\"\"\"\n    \n    def __init__(self, marque, modele, annee, vitesse_max, type_moto, cylindree):\n        \"\"\"Initialise une nouvelle moto\n        \n        Args:\n            marque (str): La marque de la moto\n            modele (str): Le modèle de la moto\n            annee (int): L'année de fabrication\n            vitesse_max (float): La vitesse maximale en km/h\n            type_moto (str): Le type de moto (sportive, routière, trail, etc.)\n            cylindree (int): La cylindrée en cm³\n        \"\"\"\n        # TODO: Appeler le constructeur de la classe parent\n        # TODO: Initialiser les attributs supplémentaires spécifiques à une moto\n        pass\n    \n    def faire_wheeling(self):\n        \"\"\"Tente de faire un wheeling avec la moto\n        \n        Returns:\n            bool: True si le wheeling est réussi, False sinon\n            \n        Note:\n            Le wheeling est réussi si la vitesse actuelle est entre 30 et 60 km/h\n        \"\"\"\n        # TODO: Implémenter la logique du wheeling\n        pass\n    \n    def decrire(self):\n        \"\"\"Retourne une description détaillée de la moto\n        \n        Returns:\n            str: Description de la moto\n        \"\"\"\n        # TODO: Surcharger la méthode decrire de la classe parent pour inclure les informations spécifiques à une moto\n        # Indice: utilisez super().decrire() pour récupérer la description de base\n        pass",
            "filename": "moto.py",
            "language": "python",
            "type": "file"
          },
          {
            "content": "import pytest\nfrom vehicule import Vehicule\nfrom voiture import Voiture\nfrom moto import Moto\n\n\ndef test_vehicule_base():\n    v = Vehicule(\"Générique\", \"Base\", 2020, 150)\n    assert v.marque == \"Générique\"\n    assert v.modele == \"Base\"\n    assert v.annee == 2020\n    assert v.vitesse_max == 150\n    assert v.vitesse_actuelle == 0\n\n\ndef test_voiture_heritage():\n    voiture = Voiture(\"Renault\", \"Clio\", 2018, 180, 5, \"Diesel\")\n    assert voiture.marque == \"Renault\"\n    assert voiture.modele == \"Clio\"\n    assert voiture.annee == 2018\n    assert voiture.vitesse_max == 180\n    assert voiture.nombre_portes == 5\n    assert voiture.type_carburant == \"Diesel\"\n    assert isinstance(voiture, Vehicule)\n\n\ndef test_moto_heritage():\n    moto = Moto(\"Honda\", \"CBR\", 2021, 280, \"Sportive\", 1000)\n    assert moto.marque == \"Honda\"\n    assert moto.modele == \"CBR\"\n    assert moto.annee == 2021\n    assert moto.vitesse_max == 280\n    assert moto.type_moto == \"Sportive\"\n    assert moto.cylindree == 1000\n    assert isinstance(moto, Vehicule)\n\n\ndef test_acceleration_vehicules():\n    vehicules = [\n        Vehicule(\"Générique\", \"Base\", 2020, 150),\n        Voiture(\"Renault\", \"Clio\", 2018, 180, 5, \"Diesel\"),\n        Moto(\"Honda\", \"CBR\", 2021, 280, \"Sportive\", 1000)\n    ]\n    \n    for v in vehicules:\n        v.accelerer(50)\n        assert v.vitesse_actuelle == 50\n\n\ndef test_klaxon_voiture():\n    voiture = Voiture(\"Renault\", \"Clio\", 2018, 180, 5, \"Diesel\")\n    assert \"tut\" in voiture.klaxonner().lower()\n\n\ndef test_wheeling_moto():\n    moto = Moto(\"Honda\", \"CBR\", 2021, 280, \"Sportive\", 1000)\n    assert not moto.faire_wheeling()  # vitesse à 0, wheeling impossible\n    moto.accelerer(45)\n    assert moto.faire_wheeling()  # vitesse entre 30 et 60, wheeling réussi\n    moto.accelerer(100)\n    assert not moto.faire_wheeling()  # vitesse > 60, wheeling impossible\n\n\ndef test_polymorphisme_decrire():\n    vehicules = [\n        Vehicule(\"Générique\", \"Base\", 2020, 150),\n        Voiture(\"Renault\", \"Clio\", 2018, 180, 5, \"Diesel\"),\n        Moto(\"Honda\", \"CBR\", 2021, 280, \"Sportive\", 1000)\n    ]\n    \n    for v in vehicules:\n        description = v.decrire()\n        assert v.marque in description\n        assert v.modele in description\n        assert str(v.annee) in description\n        \n    # Vérifications spécifiques pour les sous-classes\n    voiture_desc = vehicules[1].decrire()\n    assert \"Diesel\" in voiture_desc\n    assert \"5 portes\" in voiture_desc\n    \n    moto_desc = vehicules[2].decrire()\n    assert \"Sportive\" in moto_desc\n    assert \"1000 cm³\" in moto_desc",
            "filename": "vehiculesTest.py",
            "language": "python",
            "type": "test"
          }
        ]
      }
    ],
    "date_update": new Date()
  },
  {
    _id: UUID("2e17a346-573c-4d03-b0dd-b9d53e398fb7"),
    name: "Automatisation de fichiers avec Python",
    description: "Apprendre à automatiser la gestion de fichiers en Python",
    type: "langage",
    content: [
      {
        "index": 0,
        "type": "text",
        "content": "# Automatisation de fichiers en Python\n\nL'automatisation de la gestion des fichiers est une tâche courante en programmation. Python offre plusieurs modules intégrés qui facilitent ce travail.\n\n## Points clés :\n\n- Le module `os` permet d'interagir avec le système d'exploitation\n- Le module `shutil` offre des fonctionnalités avancées pour la manipulation de fichiers\n- L'automatisation des fichiers permet de gagner du temps sur des tâches répétitives"
      },
      {
        index: 1,
        type: 'code',
        content: '## Création d\'un script d\'automatisation\n\nCréez une fonction qui permet de trier automatiquement des fichiers par extension.\n\nUtilisez les modules `os` et `shutil` pour déplacer les fichiers.',
        files: [
          {
            content: "import os\nimport shutil\n\ndef sort_files_by_extension(directory_path: str) -> dict:\n    # TODO: Implémenter la fonction qui trie les fichiers par extension\n    # La fonction doit retourner un dictionnaire contenant le nombre de fichiers par extension\n    pass",
            filename: 'FileAutomation.py',
            language: 'python',
            type: 'file'
          },
          {
            content: "import pytest\nimport os\nimport tempfile\nimport shutil\nfrom FileAutomation import sort_files_by_extension\n\n\ndef test_sort_files_by_extension():\n    # Créer un répertoire temporaire pour les tests\n    test_dir = tempfile.mkdtemp()\n    try:\n        # Créer des fichiers de test\n        open(os.path.join(test_dir, 'doc1.txt'), 'w').close()\n        open(os.path.join(test_dir, 'doc2.txt'), 'w').close()\n        open(os.path.join(test_dir, 'image.png'), 'w').close()\n        open(os.path.join(test_dir, 'script.py'), 'w').close()\n        \n        # Exécuter la fonction\n        result = sort_files_by_extension(test_dir)\n        \n        # Vérifications\n        assert 'txt' in result and result['txt'] == 2, 'Il devrait y avoir 2 fichiers .txt'\n        assert 'png' in result and result['png'] == 1, 'Il devrait y avoir 1 fichier .png'\n        assert 'py' in result and result['py'] == 1, 'Il devrait y avoir 1 fichier .py'\n        \n        # Vérifier que les dossiers par extension ont été créés\n        assert os.path.isdir(os.path.join(test_dir, 'txt')), 'Le dossier txt devrait exister'\n        assert os.path.isdir(os.path.join(test_dir, 'png')), 'Le dossier png devrait exister'\n        assert os.path.isdir(os.path.join(test_dir, 'py')), 'Le dossier py devrait exister'\n    finally:\n        # Nettoyer après le test\n        shutil.rmtree(test_dir)",
            filename: 'FileAutomationTest.py',
            language: 'python',
            type: 'test'
          }
        ]
      }
    ],
    date_update: new Date()
  },
  {
    _id: UUID("2e17a346-573c-4d03-b0dd-b9d53e398fb8"),
    name: "Automatisation de tâches web avec Python",
    description: "Apprendre à automatiser des tâches web en utilisant Python",
    type: "langage",
    content: [
      {
        "index": 0,
        "type": "text",
        "content": "# Automatisation web avec Python\n\nL'automatisation des tâches web est une application puissante de Python. Avec les bons modules, vous pouvez extraire des données, remplir des formulaires ou interagir avec des sites web.\n\n## Points clés :\n\n- Le module `requests` permet d'envoyer des requêtes HTTP\n- La bibliothèque `BeautifulSoup` facilite l'extraction de données depuis des pages HTML\n- Python permet d'automatiser des actions répétitives sur le web, économisant ainsi du temps et des efforts"
      },
      {
        index: 1,
        type: 'code',
        content: '## Extraction de données web\n\nCréez une fonction qui récupère les titres d\'articles à partir d\'une URL.\n\nUtilisez `requests` pour obtenir la page et `BeautifulSoup` pour extraire les données.',
        files: [
          {
            content: "import requests\nfrom bs4 import BeautifulSoup\n\ndef extract_article_titles(url: str) -> list:\n    # TODO: Implémenter la fonction qui extrait les titres d'articles\n    # La fonction doit retourner une liste de titres\n    pass",
            filename: 'WebAutomation.py',
            language: 'python',
            type: 'file'
          },
          {
            content: "import pytest\nfrom unittest.mock import patch, MagicMock\nfrom WebAutomation import extract_article_titles\n\n\ndef test_extract_article_titles():\n    # HTML de test\n    mock_html = '''\n    <html>\n        <body>\n            <article>\n                <h2>Premier Article</h2>\n            </article>\n            <article>\n                <h2>Deuxième Article</h2>\n            </article>\n            <article>\n                <h2>Troisième Article</h2>\n            </article>\n        </body>\n    </html>\n    '''\n    \n    # Simuler la réponse HTTP\n    mock_response = MagicMock()\n    mock_response.text = mock_html\n    mock_response.status_code = 200\n    \n    # Simuler la fonction requests.get\n    with patch('requests.get', return_value=mock_response):\n        titles = extract_article_titles('https://example.com')\n        \n        # Vérifications\n        assert len(titles) == 3, 'Il devrait y avoir 3 titres extraits'\n        assert 'Premier Article' in titles, 'Le premier titre devrait être présent'\n        assert 'Deuxième Article' in titles, 'Le deuxième titre devrait être présent'\n        assert 'Troisième Article' in titles, 'Le troisième titre devrait être présent'",
            filename: 'WebAutomationTest.py',
            language: 'python',
            type: 'test'
          }
        ]
      }
    ],
    date_update: new Date()
  }
]);

//550e8400-e29b-41d4-a716-446655440007

db.module_lessons.insertMany([
  {
    _id: UUID("770e8400-e29b-41d4-a716-446655440000"),
    id_module: UUID("550e8400-e29b-41d4-a716-446655440000"),
    id_lesson: UUID("660e8400-e29b-41d4-a716-446655440000")
  },{
    _id: UUID("770e8400-e29b-41d4-a716-446655440001"),
    id_module: UUID("550e8400-e29b-41d4-a716-446655440000"),
    id_lesson: UUID("660e8400-e29b-41d4-a716-446655440001")
  },
  {
    _id: UUID("770e8400-e29b-41d4-a716-446655440003"),
    id_module: UUID("550e8400-e29b-41d4-a716-446655440004"),
    id_lesson: UUID("660e8400-e29b-41d4-a716-446655440003")
  },
  {
    _id: UUID("770e8400-e29b-41d4-a716-446655440007"),
    id_module: UUID("550e8400-e29b-41d4-a716-446655440004"),
    id_lesson: UUID("fd2f6102-3823-40b8-8aa9-08b19d8c4f88")
  },
  {
    _id: UUID("770e8400-e29b-41d4-a716-446655440008"),
    id_module: UUID("550e8400-e29b-41d4-a716-446655440002"),
    id_lesson: UUID("aec53a95-cc7c-4632-977c-50aca2454f60")
  },
  {
    _id: UUID("770e8400-e29b-41d4-a716-446655440009"),
    id_module: UUID("550e8400-e29b-41d4-a716-446655440002"),
    id_lesson: UUID("aec53a95-cc7c-4632-977c-50aca2454f61")
  },
  {
    _id: UUID("770e8400-e29b-41d4-a716-446655440010"),
    id_module: UUID("550e8400-e29b-41d4-a716-446655440001"),
    id_lesson: UUID("6f7f7aeb-bcd0-4d2b-b8ce-9d483da11156")
  },
  {
    _id: UUID("770e8400-e29b-41d4-a716-446655440011"),
    id_module: UUID("550e8400-e29b-41d4-a716-446655440001"),
    id_lesson: UUID("6f7f7aeb-bcd0-4d2b-b8ce-9d483da11155")
  },
  {
    _id: UUID("770e8400-e29b-41d4-a716-446655440012"),
    id_module: UUID("550e8400-e29b-41d4-a716-446655440005"),
    id_lesson: UUID("4865a0fe-6ac5-4110-b781-3ab9295fbfa8")
  },
  {
    _id: UUID("770e8400-e29b-41d4-a716-446655440013"),
    id_module: UUID("550e8400-e29b-41d4-a716-446655440005"),
    id_lesson: UUID("4865a0fe-6ac5-4110-b781-3ab9295fbfa9")
  },
  {
    _id: UUID("770e8400-e29b-41d4-a716-446655440014"),
    id_module: UUID("550e8400-e29b-41d4-a716-446655440007"),
    id_lesson: UUID("2e17a346-573c-4d03-b0dd-b9d53e398fb8")
  },
  {
    _id: UUID("770e8400-e29b-41d4-a716-446655440015"),
    id_module: UUID("550e8400-e29b-41d4-a716-446655440007"),
    id_lesson: UUID("2e17a346-573c-4d03-b0dd-b9d53e398fb7")
  },
]);
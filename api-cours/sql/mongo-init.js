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
    nblesson: 0,
    date_update: new Date()
  },
  {
    _id: UUID("550e8400-e29b-41d4-a716-446655440002"),
    id_creator: UUID("85e2662f-fe2a-4bb7-933d-81a6ab467057"),
    name: "Structures de Données et Algorithmes en Java",
    description: "Étude des structures de données et des algorithmes classiques en Java",
    nblesson: 0,
    date_update: new Date()
  },
  {
    _id: UUID("550e8400-e29b-41d4-a716-446655440004"),
    id_creator: UUID("85e2662f-fe2a-4bb7-933d-81a6ab467057"),
    name: "Introduction à Python",
    description: "Apprentissage des bases de la programmation en Python",
    nblesson: 5,
    date_update: new Date()
  },
  {
    _id: UUID("550e8400-e29b-41d4-a716-446655440005"),
    id_creator: UUID("85e2662f-fe2a-4bb7-933d-81a6ab467057"),
    name: "Programmation Orientée Objet en Python",
    description: "Exploration des principes de la POO avec Python",
    nblesson: 0,
    date_update: new Date()
  },
  {
    _id: UUID("550e8400-e29b-41d4-a716-446655440007"),
    id_creator: UUID("85e2662f-fe2a-4bb7-933d-81a6ab467057"),
    name: "Automatisation avec Python",
    description: "Utilisation de Python pour l'automatisation des tâches répétitives",
    nblesson: 0,
    date_update: new Date()
  },
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
          content: "import pytest\nfrom Calculator import add_numbers\n\n@pytest.mark.xfail\ndef test_add_numbers():\n    assert add_numbers(2, 3) == 5, 'La somme de 2 + 3 devrait être 5'\n    assert add_numbers(0, 0) == 0, 'La somme de 0 + 0 devrait être 0'\n    assert add_numbers(-2, -3) == -5, 'La somme de -2 + -3 devrait être -5'",
          filename: 'CalculatorTest.py',
          language: 'python',
          type: 'test'
        }
      ]
    }
  ],
  date_update: new Date()
},
  {
    _id: UUID("fd2f6102-3823-40b8-8aa9-08b19d8c4f85"),
    name: "Introduction à Python",
    description: "Découverte des bases du langage Python et de ses concepts fondamentaux",
    type: "langage",
    content: [
      {
        "index": 0,
        "type": "text",
        "content": "# Introduction à Python\n\nPython est un langage de programmation polyvalent, puissant et facile à apprendre. Il est idéal pour les débutants tout en étant utilisé par les professionnels dans de nombreux domaines.\n\n## Ce que vous allez apprendre\n- Les bases fondamentales de Python\n- Comment manipuler des variables et types de données\n- Comment interagir avec l'utilisateur\n- Comment écrire des programmes simples mais utiles"
      },
      {
        "index": 1,
        "type": "text",
        "content": "# Cours 1.1 : Variables et types de données\n\n## Les types fondamentaux\n- **int** : nombres entiers (1, 42, -10)\n- **float** : nombres décimaux (3.14, -0.001)\n- **str** : chaînes de caractères (\"Bonjour\", 'Python')\n- **bool** : valeurs booléennes (True, False)\n\n## Opérations de base\n- Addition: `+`\n- Soustraction: `-`\n- Multiplication: `*`\n- Division: `/` (résultat float)\n- Division entière: `//` (résultat int)\n- Modulo (reste): `%`\n- Puissance: `**`\n\n## Conversions de type\n- `int()` : convertit en entier\n- `float()` : convertit en décimal\n- `str()` : convertit en chaîne"
      },
      {
        "index": 2,
        "type": "code",
        "content": "## Exercice 1.1 : Somme de deux nombres\n\nDemandez à l'utilisateur de saisir deux nombres, convertissez-les en entiers et affichez leur somme.",
        "files": [
          {
            "content": "def somme_deux_nombres():\n    # Demander à l'utilisateur de saisir deux nombres\n    nombre1 = input(\"Entrez le premier nombre : \")\n    nombre2 = input(\"Entrez le deuxième nombre : \")\n    \n    # Convertir les entrées en entiers\n    nombre1 = int(nombre1)\n    nombre2 = int(nombre2)\n    \n    # Calculer la somme\n    somme = nombre1 + nombre2\n    \n    # Afficher le résultat\n    print(f\"La somme de {nombre1} et {nombre2} est : {somme}\")\n    \n    # Retourner la somme pour les tests\n    return somme",
            "filename": "somme.py",
            "language": "python",
            "type": "file"
          },
          {
            "content": "import pytest\nfrom somme import somme_deux_nombres\n\n@pytest.mark.parametrize(\"input_values, expected\", [\n    ([\"5\", \"7\"], 12),\n    ([\"0\", \"0\"], 0),\n    ([\"-3\", \"8\"], 5)\n])\n @pytest.mark.xfail \n def test_somme_deux_nombres(monkeypatch, input_values, expected, capsys):\n    # Simuler les entrées utilisateur\n    input_mock = iter(input_values)\n    monkeypatch.setattr(\"builtins.input\", lambda _: next(input_mock))\n    \n    # Exécuter la fonction\n    result = somme_deux_nombres()\n    \n    # Vérifier le résultat\n    assert result == expected",
            "filename": "sommeTest.py",
            "language": "python",
            "type": "test"
          }
        ]
      },
      {
        "index": 3,
        "type": "text",
        "content": "# Cours 1.2 : Affichage et entrée utilisateur\n\n## Affichage avec print()\n- `print()` affiche du texte à l'écran\n- Plusieurs arguments peuvent être séparés par des virgules\n- Le paramètre `end` contrôle ce qui est ajouté à la fin (par défaut '\\n')\n\n## Saisie avec input()\n- `input()` permet de récupérer une entrée utilisateur\n- `input()` retourne toujours une chaîne de caractères\n- Il faut convertir si un autre type est nécessaire\n\n## Formatage des chaînes\n- Concaténation: `\"Bonjour \" + nom`\n- f-strings: `f\"Bonjour {nom}, tu as {age} ans\"`\n- méthode format: `\"Bonjour {}, tu as {} ans\".format(nom, age)`"
      },
      {
        "index": 4,
        "type": "code",
        "content": "## Exercice 1.2 : Message personnalisé\n\nÉcrivez un programme qui demande le prénom et l'âge de l'utilisateur, puis affiche un message personnalisé indiquant son âge dans 5 ans.",
        "files": [
          {
            "content": "def message_personnalise():\n    # Demander le prénom de l'utilisateur\n    prenom = input(\"Quel est votre prénom ? \")\n    \n    # Demander l'âge de l'utilisateur\n    age_str = input(\"Quel est votre âge ? \")\n    \n    # Convertir l'âge en entier\n    age = int(age_str)\n    \n    # Calculer l'âge dans 5 ans\n    age_futur = age + 5\n    \n    # Créer et afficher le message personnalisé\n    message = f\"Bonjour {prenom}, tu as {age} ans et dans 5 ans tu en auras {age_futur} !\"\n    print(message)\n    \n    # Retourner le message pour les tests\n    return message",
            "filename": "message.py",
            "language": "python",
            "type": "file"
          },
          {
            "content": "import pytest\nfrom message import message_personnalise\n\n@pytest.mark.parametrize(\"input_values, expected_contains\", [\n    ([\"Alice\", \"25\"], [\"Alice\", \"25\", \"30\"]),\n    ([\"Thomas\", \"18\"], [\"Thomas\", \"18\", \"23\"]),\n    ([\"Emma\", \"40\"], [\"Emma\", \"40\", \"45\"])\n])\n @pytest.mark.xfail \n def test_message_personnalise(monkeypatch, input_values, expected_contains, capsys):\n    # Simuler les entrées utilisateur\n    input_mock = iter(input_values)\n    monkeypatch.setattr(\"builtins.input\", lambda _: next(input_mock))\n    \n    # Exécuter la fonction\n    result = message_personnalise()\n    \n    # Vérifier que le message contient les éléments attendus\n    for expected in expected_contains:\n        assert expected in result",
            "filename": "messageTest.py",
            "language": "python",
            "type": "test"
          }
        ]
      },
      {
        "index": 5,
        "type": "code",
        "content": "## Les bases de l'addition en Python\n\nComplétez la fonction qui additionne deux nombres.",
        "files": [
          {
            "content": "def add_numbers(a: int, b: int) -> int:\n    # Retourner la somme de a et b\n    return a + b",
            "filename": "Calculator.py",
            "language": "python",
            "type": "file"
          },
          {
            "content": "import pytest\nfrom Calculator import add_numbers\n\n@pytest.mark.xfail\n @pytest.mark.xfail \n def test_add_numbers():\n    assert add_numbers(2, 3) == 5, 'La somme de 2 + 3 devrait être 5'\n    assert add_numbers(0, 0) == 0, 'La somme de 0 + 0 devrait être 0'\n    assert add_numbers(-2, -3) == -5, 'La somme de -2 + -3 devrait être -5'",
            "filename": "CalculatorTest.py",
            "language": "python",
            "type": "test"
          }
        ]
      }
    ],
    date_update: new Date()
  },
  {
    _id: UUID("fd2f6102-3823-40b8-8aa9-08b19d8c4f86"),
    name: "Structures conditionnelles en Python",
    description: "Apprendre à utiliser les conditions et la prise de décision en Python",
    type: "langage",
    content: [
      {
        "index": 0,
        "type": "text",
        "content": "# Structures conditionnelles en Python\n\nLes structures conditionnelles permettent à vos programmes de prendre des décisions et d'exécuter différentes portions de code selon que certaines conditions sont vraies ou fausses.\n\n## Opérateurs de comparaison\n\n- `==` : égal à\n- `!=` : différent de\n- `<` : inférieur à\n- `>` : supérieur à\n- `<=` : inférieur ou égal à\n- `>=` : supérieur ou égal à\n\n## Opérateurs logiques\n\n- `and` : ET logique (les deux conditions doivent être vraies)\n- `or` : OU logique (au moins une condition doit être vraie)\n- `not` : NON logique (inverse la valeur de vérité)\n\n## Structure if ... elif ... else\n\n```python\nif condition1:\n    # Code exécuté si condition1 est vraie\nelif condition2:\n    # Code exécuté si condition1 est fausse et condition2 est vraie\nelse:\n    # Code exécuté si toutes les conditions précédentes sont fausses\n```\n\n### Points importants :\n- L'indentation est cruciale en Python et définit les blocs de code\n- Le bloc `elif` est optionnel et peut être répété plusieurs fois\n- Le bloc `else` est également optionnel"
      },
      {
        "index": 1,
        "type": "code",
        "content": "## Exercice : Analyse d'un nombre\n\nÉcrivez un programme qui demande un nombre à l'utilisateur et affiche s'il est positif, négatif ou nul.",
        "files": [
          {
            "content": "def analyser_nombre():\n    # Demander un nombre à l'utilisateur\n    nombre_str = input(\"Entrez un nombre : \")\n    \n    # Convertir l'entrée en nombre (entier ou flottant)\n    try:\n        # Essayer d'abord comme entier\n        nombre = int(nombre_str)\n    except ValueError:\n        # Si ce n'est pas un entier, essayer comme flottant\n        try:\n            nombre = float(nombre_str)\n        except ValueError:\n            print(\"Erreur : Veuillez entrer un nombre valide.\")\n            return \"erreur\"\n    \n    # Analyser si le nombre est positif, négatif ou nul\n    if nombre > 0:\n        resultat = \"positif\"\n        print(f\"Le nombre {nombre} est positif.\")\n    elif nombre < 0:\n        resultat = \"négatif\"\n        print(f\"Le nombre {nombre} est négatif.\")\n    else:  # nombre == 0\n        resultat = \"nul\"\n        print(f\"Le nombre {nombre} est nul.\")\n    \n    # Retourner le résultat pour les tests\n    return resultat",
            "filename": "analyse_nombre.py",
            "language": "python",
            "type": "file"
          },
          {
            "content": "import pytest\nfrom analyse_nombre import analyser_nombre\n\n@pytest.mark.parametrize(\"input_value, expected_result\", [\n    (\"42\", \"positif\"),\n    (\"0\", \"nul\"),\n    (\"-15\", \"négatif\"),\n    (\"3.14\", \"positif\"),\n    (\"-0.5\", \"négatif\")\n])\n @pytest.mark.xfail \n def test_analyser_nombre(monkeypatch, input_value, expected_result, capsys):\n    # Simuler l'entrée utilisateur\n    monkeypatch.setattr(\"builtins.input\", lambda _: input_value)\n    \n    # Exécuter la fonction\n    result = analyser_nombre()\n    \n    # Vérifier le résultat\n    assert result == expected_result\n    \n    # Vérifier que le message contient le résultat attendu\n    captured = capsys.readouterr()\n    assert expected_result in captured.out.lower()",
            "filename": "analyse_nombreTest.py",
            "language": "python",
            "type": "test"
          }
        ]
      },
      {
        "index": 2,
        "type": "code",
        "content": "## Exercice avancé : Catégorisation d'âge\n\nÉcrivez un programme qui demande l'âge d'une personne et affiche dans quelle catégorie elle se trouve :\n- Enfant (0-12 ans)\n- Adolescent (13-17 ans)\n- Adulte (18-59 ans)\n- Senior (60 ans et plus)",
        "files": [
          {
            "content": "def categoriser_age():\n    # Demander l'âge à l'utilisateur\n    age_str = input(\"Quel est votre âge ? \")\n    \n    # Convertir en entier\n    try:\n        age = int(age_str)\n        \n        # Vérifier que l'âge est positif\n        if age < 0:\n            print(\"Erreur : L'âge ne peut pas être négatif.\")\n            return \"erreur\"\n            \n        # Déterminer la catégorie d'âge\n        if age <= 12:\n            categorie = \"enfant\"\n            print(f\"À {age} ans, vous êtes un enfant.\")\n        elif age <= 17:\n            categorie = \"adolescent\"\n            print(f\"À {age} ans, vous êtes un adolescent.\")\n        elif age <= 59:\n            categorie = \"adulte\"\n            print(f\"À {age} ans, vous êtes un adulte.\")\n        else:  # age >= 60\n            categorie = \"senior\"\n            print(f\"À {age} ans, vous êtes un senior.\")\n            \n        return categorie\n        \n    except ValueError:\n        print(\"Erreur : Veuillez entrer un âge valide (nombre entier).\")\n        return \"erreur\"",
            "filename": "categorie_age.py",
            "language": "python",
            "type": "file"
          },
          {
            "content": "import pytest\nfrom categorie_age import categoriser_age\n\n@pytest.mark.parametrize(\"input_age, expected_category\", [\n    (\"8\", \"enfant\"),\n    (\"15\", \"adolescent\"),\n    (\"30\", \"adulte\"),\n    (\"75\", \"senior\"),\n    (\"0\", \"enfant\"),\n    (\"12\", \"enfant\"),\n    (\"13\", \"adolescent\"),\n    (\"17\", \"adolescent\"),\n    (\"18\", \"adulte\"),\n    (\"59\", \"adulte\"),\n    (\"60\", \"senior\")\n])\n @pytest.mark.xfail \n def test_categoriser_age(monkeypatch, input_age, expected_category, capsys):\n    # Simuler l'entrée utilisateur\n    monkeypatch.setattr(\"builtins.input\", lambda _: input_age)\n    \n    # Exécuter la fonction\n    result = categoriser_age()\n    \n    # Vérifier le résultat\n    assert result == expected_category\n    \n    # Vérifier que le message contient la catégorie attendue\n    captured = capsys.readouterr()\n    assert expected_category in captured.out.lower()",
            "filename": "categorie_ageTest.py",
            "language": "python",
            "type": "test"
          }
        ]
      },
      {
        "index": 3,
        "type": "text",
        "content": "# Bonne pratiques pour les structures conditionnelles\n\n## Simplifier les conditions\n- Évitez les conditions trop complexes\n- Utilisez des variables intermédiaires pour décomposer des expressions compliquées\n\n## Gestion des cas limites\n- Pensez toujours aux valeurs extrêmes et cas particuliers\n- Validez les entrées utilisateur avant de les utiliser\n\n## Lisibilité\n- Choisissez un ordre logique pour vos conditions\n- Commentez les conditions complexes\n- Utilisez des noms de variables explicites dans vos conditions\n\n## Expression conditionnelle (opérateur ternaire)\nPython permet d'écrire des conditions compactes sur une ligne :\n```python\nresultat = \"positif\" if nombre > 0 else \"non positif\"\n```"
      }
    ],
    date_update: new Date()
  },
  {
    _id: UUID("fd2f6102-3823-40b8-8aa9-08b19d8c4f87"),
    name: "Boucles et itérations en Python",
    description: "Maîtriser les structures de répétition while et for en Python",
    type: "langage",
    content: [
      {
        "index": 0,
        "type": "text",
        "content": "# Boucles et itérations en Python\n\nLes boucles sont des structures fondamentales en programmation qui permettent d'exécuter un bloc de code plusieurs fois. Python propose deux types principaux de boucles : la boucle `while` et la boucle `for`.\n\n## Pourquoi utiliser des boucles ?\n- Automatiser des tâches répétitives\n- Traiter des collections de données\n- Exécuter du code jusqu'à ce qu'une condition soit remplie\n- Créer des algorithmes plus complexes"
      },
      {
        "index": 1,
        "type": "text",
        "content": "# Cours 3.1 : La boucle while\n\n## Principe et syntaxe\n\nLa boucle `while` exécute un bloc de code tant qu'une condition est vraie.\n\n```python\nwhile condition:\n    # Code à exécuter\n    # La condition est vérifiée après chaque itération\n```\n\nPoints importants :\n- La condition est évaluée avant chaque itération\n- Si la condition est fausse dès le départ, le bloc n'est jamais exécuté\n- Attention aux boucles infinies (quand la condition reste toujours vraie)\n\n## Contrôle du flux avec break et continue\n\n- `break` : sort immédiatement de la boucle\n- `continue` : passe directement à l'itération suivante (ignore le code restant dans la boucle)\n\n```python\nwhile True:  # Boucle infinie volontaire\n    # ...\n    if condition_sortie:\n        break  # Sort de la boucle\n    # ...\n    if condition_passer:\n        continue  # Passe à l'itération suivante\n    # ...\n```"
      },
      {
        "index": 2,
        "type": "code",
        "content": "## Exercice 3.1 : Vérification de mot de passe\n\nÉcrivez un programme qui demande à l'utilisateur d'entrer un mot de passe et ne sort de la boucle que lorsque le mot de passe correct est entré.",
        "files": [
          {
            "content": "def verifier_mot_de_passe(mot_de_passe_correct=\"python123\"):\n    \"\"\"Fonction qui demande un mot de passe jusqu'à ce que l'utilisateur entre le bon.\n    \n    Args:\n        mot_de_passe_correct (str): Le mot de passe attendu\n        \n    Returns:\n        int: Le nombre de tentatives effectuées\n    \"\"\"\n    tentatives = 0\n    \n    while True:\n        tentatives += 1\n        saisie = input(\"Entrez le mot de passe : \")\n        \n        if saisie == mot_de_passe_correct:\n            print(f\"Mot de passe correct ! Vous avez réussi en {tentatives} tentative(s).\")\n            break\n        else:\n            print(\"Mot de passe incorrect. Essayez encore.\")\n    \n    return tentatives",
            "filename": "verification_mdp.py",
            "language": "python",
            "type": "file"
          },
          {
            "content": "import pytest\nfrom verification_mdp import verifier_mot_de_passe\n\n @pytest.mark.xfail \n def test_verifier_mot_de_passe_correct_premiere_tentative(monkeypatch, capsys):\n    # Simuler une entrée correcte du premier coup\n    monkeypatch.setattr(\"builtins.input\", lambda _: \"python123\")\n    \n    # Exécuter la fonction\n    tentatives = verifier_mot_de_passe()\n    \n    # Vérifier le nombre de tentatives\n    assert tentatives == 1\n    \n    # Vérifier le message de sortie\n    captured = capsys.readouterr()\n    assert \"Mot de passe correct\" in captured.out\n    assert \"1 tentative\" in captured.out\n\n @pytest.mark.xfail \n def test_verifier_mot_de_passe_plusieurs_tentatives(monkeypatch, capsys):\n    # Simuler plusieurs tentatives avant la bonne réponse\n    inputs = [\"incorrect1\", \"incorrect2\", \"python123\"]\n    input_mock = iter(inputs)\n    monkeypatch.setattr(\"builtins.input\", lambda _: next(input_mock))\n    \n    # Exécuter la fonction\n    tentatives = verifier_mot_de_passe()\n    \n    # Vérifier le nombre de tentatives\n    assert tentatives == 3\n    \n    # Vérifier les messages de sortie\n    captured = capsys.readouterr()\n    assert \"incorrect\" in captured.out.lower()\n    assert \"3 tentative\" in captured.out",
            "filename": "verification_mdpTest.py",
            "language": "python",
            "type": "test"
          }
        ]
      },
      {
        "index": 3,
        "type": "text",
        "content": "# Cours 3.2 : La boucle for et range()\n\n## La boucle for\n\nLa boucle `for` permet de parcourir les éléments d'une séquence (liste, tuple, chaîne de caractères, etc.).\n\n```python\nfor element in sequence:\n    # Code à exécuter pour chaque élément\n```\n\nExemples :\n```python\n# Parcourir une chaîne\nfor caractere in \"Python\":\n    print(caractere)\n\n# Parcourir une liste\nfor fruit in [\"pomme\", \"banane\", \"orange\"]:\n    print(fruit)\n```\n\n## La fonction range()\n\nLa fonction `range()` génère une séquence de nombres entiers qui peut être utilisée avec une boucle `for`.\n\nSyntaxe :\n- `range(stop)` : génère des nombres de 0 à stop-1\n- `range(start, stop)` : génère des nombres de start à stop-1\n- `range(start, stop, step)` : génère des nombres de start à stop-1 avec un pas de step\n\nExemples :\n```python\n# 0, 1, 2, 3, 4\nfor i in range(5):\n    print(i)\n\n# 2, 3, 4, 5, 6\nfor i in range(2, 7):\n    print(i)\n\n# 1, 3, 5, 7, 9\nfor i in range(1, 10, 2):\n    print(i)\n```\n\n## break et continue\n\nComme pour les boucles `while`, les instructions `break` et `continue` fonctionnent aussi avec les boucles `for`."
      },
      {
        "index": 4,
        "type": "code",
        "content": "## Exercice 3.2 : Affichage des nombres pairs\n\nÉcrivez un programme qui affiche tous les nombres pairs entre 1 et 20.",
        "files": [
          {
            "content": "def afficher_nombres_pairs(debut=1, fin=20):\n    \"\"\"Affiche tous les nombres pairs dans l'intervalle [debut, fin].\n    \n    Args:\n        debut (int): Limite inférieure de l'intervalle (incluse)\n        fin (int): Limite supérieure de l'intervalle (incluse)\n        \n    Returns:\n        list: Liste des nombres pairs trouvés\n    \"\"\"\n    nombres_pairs = []\n    \n    # Méthode 1 : Utiliser range avec un pas de 2\n    print(\"Méthode 1 : Utiliser range avec un pas de 2\")\n    # Ajuster le début pour commencer par un nombre pair\n    debut_ajuste = debut if debut % 2 == 0 else debut + 1\n    for nombre in range(debut_ajuste, fin + 1, 2):\n        print(nombre, end=\" \")\n        nombres_pairs.append(nombre)\n    print()  # Retour à la ligne\n    \n    # Méthode 2 : Filtrer avec une condition\n    print(\"\\nMéthode 2 : Utiliser une condition pour filtrer\")\n    for nombre in range(debut, fin + 1):\n        if nombre % 2 == 0:  # Vérifie si le nombre est pair\n            print(nombre, end=\" \")\n    print()  # Retour à la ligne\n    \n    return nombres_pairs",
            "filename": "nombres_pairs.py",
            "language": "python",
            "type": "file"
          },
          {
            "content": "import pytest\nfrom nombres_pairs import afficher_nombres_pairs\n\n @pytest.mark.xfail \n def test_afficher_nombres_pairs_intervalle_standard(capsys):\n    # Tester avec l'intervalle par défaut (1-20)\n    resultat = afficher_nombres_pairs()\n    \n    # Vérifier le résultat\n    assert resultat == [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]\n    \n    # Vérifier la sortie\n    captured = capsys.readouterr()\n    for nombre in [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]:\n        assert str(nombre) in captured.out\n\n @pytest.mark.xfail \n def test_afficher_nombres_pairs_intervalle_personnalise(capsys):\n    # Tester avec un intervalle personnalisé\n    resultat = afficher_nombres_pairs(5, 15)\n    \n    # Vérifier le résultat\n    assert resultat == [6, 8, 10, 12, 14]\n    \n    # Vérifier la sortie\n    captured = capsys.readouterr()\n    for nombre in [6, 8, 10, 12, 14]:\n        assert str(nombre) in captured.out",
            "filename": "nombres_pairsTest.py",
            "language": "python",
            "type": "test"
          }
        ]
      },
      {
        "index": 5,
        "type": "code",
        "content": "## Exercice bonus : Table de multiplication\n\nÉcrivez un programme qui affiche la table de multiplication d'un nombre demandé à l'utilisateur.",
        "files": [
          {
            "content": "def afficher_table_multiplication():\n    \"\"\"Affiche la table de multiplication d'un nombre saisi par l'utilisateur.\n    \n    Returns:\n        tuple: (nombre, liste des résultats de la table)\n    \"\"\"\n    # Demander un nombre à l'utilisateur\n    try:\n        nombre = int(input(\"Entrez un nombre pour voir sa table de multiplication : \"))\n        \n        # Afficher la table de multiplication\n        print(f\"\\nTable de multiplication de {nombre} :\")\n        print(\"-\" * 30)\n        \n        resultats = []\n        for i in range(1, 11):\n            resultat = nombre * i\n            resultats.append(resultat)\n            print(f\"{nombre} × {i} = {resultat}\")\n        \n        return (nombre, resultats)\n        \n    except ValueError:\n        print(\"Erreur : Veuillez entrer un nombre entier valide.\")\n        return (0, [])",
            "filename": "table_multiplication.py",
            "language": "python",
            "type": "file"
          },
          {
            "content": "import pytest\nfrom table_multiplication import afficher_table_multiplication\n\n @pytest.mark.xfail \n def test_table_multiplication(monkeypatch, capsys):\n    # Simuler l'entrée utilisateur\n    monkeypatch.setattr(\"builtins.input\", lambda _: \"7\")\n    \n    # Exécuter la fonction\n    nombre, resultats = afficher_table_multiplication()\n    \n    # Vérifier le nombre\n    assert nombre == 7\n    \n    # Vérifier les résultats\n    assert resultats == [7, 14, 21, 28, 35, 42, 49, 56, 63, 70]\n    \n    # Vérifier la sortie\n    captured = capsys.readouterr()\n    for i in range(1, 11):\n        assert f\"7 × {i} = {7*i}\" in captured.out",
            "filename": "table_multiplicationTest.py",
            "language": "python",
            "type": "test"
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
            "content": "import pytest\nfrom fonction_puissance import puissance\n\n@pytest.mark.parametrize(\"a, b, expected\", [\n    (2, 3, 8),  # Cas de base\n    (5, 2, 25),  # Autre cas simple\n    (10, 0, 1),  # Exposant zéro\n    (2, -1, 0.5),  # Exposant négatif\n    (1.5, 2, 2.25),  # Nombre décimal\n    (0, 5, 0),  # Base zéro\n    (1, 100, 1),  # Exposant grand\n    (3, 3, 27)  # Autre test\n])\n @pytest.mark.xfail \n def test_puissance(a, b, expected):\n    # Vérifier avec une tolérance pour les nombres décimaux\n    assert puissance(a, b) == pytest.approx(expected)\n\n@pytest.mark.parametrize(\"a, b\", [\n    (0, 0),  # Cas indéterminé\n])\n @pytest.mark.xfail \n def test_puissance_indetermine(a, b):\n    # 0^0 est généralement défini comme 1 en Python, mais c'est mathématiquement indéterminé\n    # On vérifie juste que la fonction ne lève pas d'exception\n    result = puissance(a, b)\n    assert result is not None",
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
            "content": "import pytest\nfrom fonction_salutation import saluer\n\n @pytest.mark.xfail \n def test_saluer_message_defaut(capsys):\n    # Tester avec le message par défaut\n    resultat = saluer(\"Alice\")\n    \n    # Vérifier la valeur de retour\n    assert resultat == \"Bonjour Alice!\"\n    \n    # Vérifier la sortie console\n    captured = capsys.readouterr()\n    assert \"Bonjour Alice!\" in captured.out\n\n @pytest.mark.xfail \n def test_saluer_message_personnalise(capsys):\n    # Tester avec un message personnalisé\n    resultat = saluer(\"Bob\", \"Salut\")\n    \n    # Vérifier la valeur de retour\n    assert resultat == \"Salut Bob!\"\n    \n    # Vérifier la sortie console\n    captured = capsys.readouterr()\n    assert \"Salut Bob!\" in captured.out\n\n @pytest.mark.xfail \n def test_saluer_arguments_nommes(capsys):\n    # Tester avec des arguments nommés\n    resultat = saluer(message=\"Bienvenue\", nom=\"Charlie\")\n    \n    # Vérifier la valeur de retour\n    assert resultat == \"Bienvenue Charlie!\"\n    \n    # Vérifier la sortie console\n    captured = capsys.readouterr()\n    assert \"Bienvenue Charlie!\" in captured.out",
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
            "content": "import pytest\nfrom fonction_contact import formater_contact\n\n @pytest.mark.xfail \n def test_formater_contact_minimal(capsys):\n    # Tester avec seulement les informations obligatoires\n    resultat = formater_contact(\"Dupont\", \"Jean\")\n    \n    # Vérifier la valeur de retour\n    assert resultat == \"Jean DUPONT\"\n    assert \"Tél:\" not in resultat\n    \n    # Vérifier la sortie console\n    captured = capsys.readouterr()\n    assert \"Jean DUPONT\" in captured.out\n\n @pytest.mark.xfail \n  def test_formater_contact_complet(capsys):\n    # Tester avec toutes les informations\n    resultat = formater_contact(\n        \"Martin\", \n        \"Sophie\", \n        telephone=\"01 23 45 67 89\", \n        email=\"sophie.martin@exemple.com\", \n        adresse=\"123 rue de Paris, 75001 Paris\"\n    )\n    \n    # Vérifier la valeur de retour\n    assert \"Sophie MARTIN\" in resultat\n    assert \"Tél: 01 23 45 67 89\" in resultat\n    assert \"Email: sophie.martin@exemple.com\" in resultat\n    assert \"Adresse: 123 rue de Paris, 75001 Paris\" in resultat\n    \n    # Vérifier la sortie console\n    captured = capsys.readouterr()\n    assert \"Sophie MARTIN\" in captured.out\n    assert \"Tél: 01 23 45 67 89\" in captured.out\n\n @pytest.mark.xfail \n def test_formater_contact_partiel(capsys):\n    # Tester avec certaines informations optionnelles seulement\n    resultat = formater_contact(\"Durand\", \"Paul\", email=\"paul.durand@exemple.com\")\n    \n    # Vérifier la valeur de retour\n    assert \"Paul DURAND\" in resultat\n    assert \"Email: paul.durand@exemple.com\" in resultat\n    assert \"Tél:\" not in resultat\n    assert \"Adresse:\" not in resultat\n    \n    # Vérifier la sortie console\n    captured = capsys.readouterr()\n    assert \"Paul DURAND\" in captured.out\n    assert \"Email: paul.durand@exemple.com\" in captured.out",
            "filename": "fonction_contactTest.py",
            "language": "python",
            "type": "test"
          }
        ]
      }
    ],
    date_update: new Date()
  },
]);

//fd2f6102-3823-40b8-8aa9-08b19d8c4f85
//550e8400-e29b-41d4-a716-446655440004

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
    _id: UUID("770e8400-e29b-41d4-a716-446655440004"),
    id_module: UUID("550e8400-e29b-41d4-a716-446655440004"),
    id_lesson: UUID("fd2f6102-3823-40b8-8aa9-08b19d8c4f85")
  },
  {
    _id: UUID("770e8400-e29b-41d4-a716-446655440005"),
    id_module: UUID("550e8400-e29b-41d4-a716-446655440004"),
    id_lesson: UUID("fd2f6102-3823-40b8-8aa9-08b19d8c4f86")
  },
  {
    _id: UUID("770e8400-e29b-41d4-a716-446655440006"),
    id_module: UUID("550e8400-e29b-41d4-a716-446655440004"),
    id_lesson: UUID("fd2f6102-3823-40b8-8aa9-08b19d8c4f87")
  },
  {
    _id: UUID("770e8400-e29b-41d4-a716-446655440007"),
    id_module: UUID("550e8400-e29b-41d4-a716-446655440004"),
    id_lesson: UUID("fd2f6102-3823-40b8-8aa9-08b19d8c4f88")
  }

]);

db.lesson_erreurs.insertMany([
  {
    _id: UUID("880e8400-e29b-41d4-a716-446655440000"),
    id_lesson: UUID("660e8400-e29b-41d4-a716-446655440000"),
    errors: [
      {
        index: 0,
        errors: {
          test_1: {
            fonction_1: 36,
            fonction_2: 12,
            fonction_3: 24
          },
           test_2: {
            fonction_1: 36,
            fonction_2: 12,
            fonction_3: 24
          },
          test_3: {
            fonction_1: 36,
            fonction_2: 12,
            fonction_3: 24
          }
        },
      },
    ]
  },
  {
    _id: UUID("880e8400-e29b-41d4-a716-446655440001"),
    id_lesson: UUID("660e8400-e29b-41d4-a716-446655440001"),
    errors: [
      {
        index: 0,
        errors: {
          test_1: {
            fonction_1: 36,
            fonction_2: 12,
            fonction_3: 24
          },
           test_2: {
            fonction_1: 36,
            fonction_2: 12,
            fonction_3: 24
          },
          test_3: {
            fonction_1: 36,
            fonction_2: 12,
            fonction_3: 24
          }
        },
      },
      {
        index: 1,
        errors: {
          test_1: {
            fonction_1: 36,
            fonction_2: 12,
            fonction_3: 24
          }
        },
      },
    ]
  }
]);
    

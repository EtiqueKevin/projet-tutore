db = db.getSiblingDB('cours');

db.modules.insertMany([
  {
    _id: UUID("550e8400-e29b-41d4-a716-446655440000"),
    id_creator: UUID("85e2662f-fe2a-4bb7-933d-81a6ab467057"),
    name: "Introduction à Java",
    description: "Apprentissage des bases de la programmation en Java",
    nblesson: 1,
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
    nblesson: 0,
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
        assertEquals( 5, Calculator.add(2, 3));
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
}
]);

db.module_lessons.insertMany([
  {
    _id: UUID("770e8400-e29b-41d4-a716-446655440000"),
    id_module: UUID("550e8400-e29b-41d4-a716-446655440000"),
    id_lesson: UUID("660e8400-e29b-41d4-a716-446655440000")
  },{
    _id: UUID("770e8400-e29b-41d4-a716-446655440001"),
    id_module: UUID("550e8400-e29b-41d4-a716-446655440000"),
    id_lesson: UUID("660e8400-e29b-41d4-a716-446655440001")
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
  }
]);
    

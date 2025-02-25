db = db.getSiblingDB('cours');

db.modules.insertMany([
  {
    _id: UUID("550e8400-e29b-41d4-a716-446655440000"),
    id_creator: UUID("85e2662f-fe2a-4bb7-933d-81a6ab467057"),
    name: "Introduction à Java",
    description: "Apprentissage des bases de la programmation en Java",
    nblesson: 5,
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
        assertEquals(5, Calculator.add(2, 3));
        assertEquals(0, Calculator.add(0, 0));
        assertEquals(-5, Calculator.add(-2, -3));
    }
}`,
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
  }
]);

db.module_lessons.insertMany([
  {
    _id: UUID("770e8400-e29b-41d4-a716-446655440000"),
    id_module: UUID("550e8400-e29b-41d4-a716-446655440000"),
    id_lesson: UUID("660e8400-e29b-41d4-a716-446655440000")
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
    

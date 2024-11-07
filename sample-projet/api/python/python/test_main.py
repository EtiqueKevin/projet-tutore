import unittest
from main import add

class TestAddFunction(unittest.TestCase):
    def testadd(self):
        self.assertEqual(add(2, 3), 5)

if __name__ == '__main__':
    unittest.main()
import { LabUnit, UnitId, SimulationType } from './types';

// Helper for common Turbo C boilerplate
const turboCHeader = `#include<stdio.h>
#include<conio.h>

void main() {
`;
const turboCFooter = `
    getch();
}`;

export const LAB_DATA: LabUnit[] = [
  {
    id: UnitId.UNIT_II,
    title: 'Unit II: Control Structures & Loops',
    problems: [
      {
        id: 'u2-p1',
        title: '1. Celsius <-> Fahrenheit',
        description: 'Convert degrees Celsius to Fahrenheit and vice versa.',
        details: {
          explanation: "Temperature conversion is a linear transformation. The freezing point of water is 0°C or 32°F, and the boiling point is 100°C or 212°F. This program provides a menu-driven interface to perform conversions in either direction.",
          formula: "F = (C * 9/5) + 32  |  C = (F - 32) * 5/9",
          inputAnalysis: "Requires one floating-point number for the temperature and one integer for the menu choice (1 or 2).",
          logicConstruction: "Use a simple `if-else` or `switch` statement to check the user's choice. Apply the corresponding formula and print the result formatted to 2 decimal places.",
          testCases: [
            { input: "Choice: 1, Temp: 0", output: "32.00" },
            { input: "Choice: 1, Temp: 100", output: "212.00" },
            { input: "Choice: 2, Temp: 32", output: "0.00" }
          ]
        },
        simulationType: SimulationType.INTERACTIVE_FORM,
        algorithm: [
          'Start',
          'Declare float variables temp, result and int choice',
          'Clear screen',
          'Print menu: 1. Celsius to Fahrenheit, 2. Fahrenheit to Celsius',
          'Read choice',
          'If choice == 1:',
          '  Print "Enter Temp in Celsius"',
          '  Read temp',
          '  Calculate result = (temp * 9.0/5.0) + 32',
          '  Print result',
          'Else:',
          '  Print "Enter Temp in Fahrenheit"',
          '  Read temp',
          '  Calculate result = (temp - 32) * 5.0/9.0',
          '  Print result',
          'Stop'
        ],
        cCode: `${turboCHeader}    float temp, result;
    int choice;
    clrscr();
    printf("1. Celsius to Fahrenheit\\n2. Fahrenheit to Celsius\\nEnter choice: ");
    scanf("%d", &choice);

    if(choice == 1) {
        printf("Enter Temp in Celsius: ");
        scanf("%f", &temp);
        result = (temp * 9.0/5.0) + 32;
        printf("Temp in Fahrenheit: %.2f", result);
    } else {
        printf("Enter Temp in Fahrenheit: ");
        scanf("%f", &temp);
        result = (temp - 32) * 5.0/9.0;
        printf("Temp in Celsius: %.2f", result);
    }${turboCFooter}`
      },
      {
        id: 'u2-p2',
        title: '2. Sort 3 Numbers',
        description: 'Display three input numbers in sorted (non-decreasing) order.',
        details: {
          explanation: "Sorting involves arranging data in a specific order (ascending or descending). For a small set of numbers (like 3), we can use simple conditional swaps rather than complex sorting algorithms.",
          inputAnalysis: "Three integer variables (a, b, c).",
          logicConstruction: "We compare pairs of numbers and swap them if they are in the wrong order. By comparing (a,b), then (a,c), then (b,c), we bubble the largest values to the end or smallest to the start.",
          testCases: [
            { input: "5, 2, 8", output: "2, 5, 8" },
            { input: "10, 10, 5", output: "5, 10, 10" },
            { input: "-1, -5, 0", output: "-5, -1, 0" }
          ]
        },
        simulationType: SimulationType.INTERACTIVE_FORM,
        algorithm: [
          'Start',
          'Declare integers a, b, c, temp',
          'Clear screen',
          'Read three numbers into a, b, c',
          'If a > b: Swap a and b',
          'If a > c: Swap a and c',
          'If b > c: Swap b and c',
          'Print a, b, c',
          'Stop'
        ],
        cCode: `${turboCHeader}    int a, b, c, temp;
    clrscr();
    printf("Enter three numbers: ");
    scanf("%d %d %d", &a, &b, &c);

    if (a > b) { temp = a; a = b; b = temp; }
    if (a > c) { temp = a; a = c; c = temp; }
    if (b > c) { temp = b; b = c; c = temp; }

    printf("Sorted numbers: %d, %d, %d", a, b, c);${turboCFooter}`
      },
      {
        id: 'u2-p3',
        title: '3. Number, Square, Cube Table',
        description: 'Given positive integer n, display number, square and cube from 1 to n.',
        details: {
          explanation: "This program generates a mathematical reference table. It iterates through numbers from 1 up to a user-defined limit 'n' and calculates the power of 2 (square) and power of 3 (cube) for each.",
          inputAnalysis: "One positive integer 'n' where n >= 0.",
          logicConstruction: "Use a `for` loop running from i=1 to n. Inside the loop, simply print `i`, `i*i`, and `i*i*i` separated by tabs (`\\t`).",
          testCases: [
            { input: "n = 3", output: "1 1 1\n2 4 8\n3 9 27" },
            { input: "n = 1", output: "1 1 1" }
          ]
        },
        simulationType: SimulationType.CONSOLE,
        algorithm: [
            'Start',
            'Declare integers n, i',
            'Read n',
            'Print header "Num Square Cube"',
            'Loop i from 1 to n:',
            '  Print i, i*i, i*i*i',
            'Stop'
        ],
        cCode: `${turboCHeader}    int n, i;
    clrscr();
    printf("Enter n: ");
    scanf("%d", &n);
    printf("Num\\tSquare\\tCube\\n");
    for(i=1; i<=n; i++) {
        printf("%d\\t%d\\t%d\\n", i, i*i, i*i*i);
    }${turboCFooter}`
      },
      {
        id: 'u2-p4',
        title: '4. Odd Numbers Range',
        description: 'Display odd numbers from range [1, n].',
        details: {
          explanation: "An odd number is an integer not divisible by 2. This program filters numbers in a sequence and displays only those that satisfy this condition.",
          formula: "if (i % 2 != 0)",
          inputAnalysis: "One positive integer 'n' defining the upper bound of the range.",
          logicConstruction: "Iterate from 1 to n. Use the modulus operator `%`. If `i % 2` is non-zero, print `i`. Alternatively, start at 1 and increment by 2 (i+=2) to avoid the `if` check completely.",
          testCases: [
            { input: "n = 10", output: "1, 3, 5, 7, 9" },
            { input: "n = 5", output: "1, 3, 5" }
          ]
        },
        simulationType: SimulationType.CONSOLE,
        algorithm: [
            'Start',
            'Declare integers n, i',
            'Read n',
            'Loop i from 1 to n:',
            '  If i % 2 != 0:',
            '    Print i',
            'Stop'
        ],
        cCode: `${turboCHeader}    int n, i;
    clrscr();
    printf("Enter n: ");
    scanf("%d", &n);
    printf("Odd numbers: ");
    for(i=1; i<=n; i++) {
        if(i % 2 != 0) printf("%d ", i);
    }${turboCFooter}`
      },
      {
        id: 'u2-p5',
        title: '5. Mathematical Tables',
        description: 'Display first n mathematical tables up to m rows.',
        details: {
            explanation: "Generates multiplication tables (e.g., Table of 2: 2x1=2, 2x2=4...). It generalizes the problem to generate 'n' distinct tables, each having 'm' rows.",
            inputAnalysis: "Two integers: 'n' (how many tables) and 'm' (rows per table).",
            logicConstruction: "Requires a Nested Loop. The outer loop `i` runs from 1 to n (controlling which number's table is printing). The inner loop `j` runs from 1 to m (controlling the multiplier).",
            testCases: [
                { input: "n=2, m=3", output: "Table 1:\n1*1=1\n1*2=2\n1*3=3\nTable 2:\n2*1=2\n2*2=4\n2*3=6" }
            ]
        },
        simulationType: SimulationType.CONSOLE,
        algorithm: [
            'Start',
            'Declare integers n, m, i, j',
            'Read number of tables (n)',
            'Read rows per table (m)',
            'Loop i from 1 to n (Outer loop for tables):',
            '  Print "Table of i"',
            '  Loop j from 1 to m (Inner loop for rows):',
            '    Print "i * j = result"',
            '  Print newline',
            'Stop'
        ],
        cCode: `${turboCHeader}    int n, m, i, j;
    clrscr();
    printf("Enter number of tables (n): ");
    scanf("%d", &n);
    printf("Enter rows per table (m): ");
    scanf("%d", &m);

    for(i=1; i<=n; i++) {
        printf("Table of %d:\\n", i);
        for(j=1; j<=m; j++) {
            printf("%d * %d = %d\\n", i, j, i*j);
        }
        printf("\\n");
    }${turboCFooter}`
      },
      {
        id: 'u2-p6a',
        title: '6a. Pattern: Increasing Stars',
        description: 'Display a right-angled triangle of stars (Increasing).',
        details: {
            explanation: "A classic nested loop problem. We need to print n rows, where the 1st row has 1 star, the 2nd has 2 stars, and so on.",
            inputAnalysis: "Integer n (number of rows).",
            logicConstruction: "Outer loop `i` from 1 to n. Inner loop `j` from 1 to `i`. Print '*' inside inner loop. Print newline after inner loop finishes.",
            testCases: [
                { input: "n=3", output: "*\n**\n***" }
            ]
        },
        simulationType: SimulationType.PATTERN,
        defaultInputs: { patternType: 'stars_inc', n: 5 },
        algorithm: [
          'Start',
          'Declare integers i, j, n',
          'Read number of rows (n)',
          'Loop i from 1 to n:',
          '  Loop j from 1 to i:',
          '    Print "*"',
          '  Print newline',
          'Stop'
        ],
        cCode: `${turboCHeader}    int i, j, n;
    clrscr();
    printf("Enter rows: ");
    scanf("%d", &n);
    for(i=1; i<=n; i++) {
        for(j=1; j<=i; j++) printf("*");
        printf("\\n");
    }${turboCFooter}`
      },
      {
        id: 'u2-p6b',
        title: '6b. Pattern: Decreasing Stars',
        description: 'Display an inverted right-angled triangle of stars.',
        details: {
            explanation: "Prints stars starting with 'n' in the first row and decreasing by 1 in each subsequent row.",
            inputAnalysis: "Integer n (rows).",
            logicConstruction: "Outer loop `i` starts at n and decrements to 1. Inner loop `j` runs from 1 to `i`, printing stars.",
            testCases: [{ input: "n=3", output: "***\n**\n*" }]
        },
        simulationType: SimulationType.PATTERN,
        defaultInputs: { patternType: 'stars_dec', n: 5 },
        algorithm: [
          'Start',
          'Declare integers i, j, n',
          'Read n',
          'Loop i from n down to 1:',
          '  Loop j from 1 to i:',
          '    Print "*"',
          '  Print newline',
          'Stop'
        ],
        cCode: `${turboCHeader}    int i, j, n;
    clrscr();
    printf("Enter rows: ");
    scanf("%d", &n);
    for(i=n; i>=1; i--) {
        for(j=1; j<=i; j++) printf("*");
        printf("\\n");
    }${turboCFooter}`
      },
      {
        id: 'u2-p6c',
        title: '6c. Pattern: Decreasing Numbers',
        description: 'Display decreasing number pattern (e.g. 12345, 1234...).',
        details: {
            explanation: "Similar to the decreasing star pattern, but instead of a fixed character, we print the loop counter variable to show numbers.",
            inputAnalysis: "Integer n.",
            logicConstruction: "Outer loop `i` from n down to 1 (controls row length). Inner loop `j` from 1 to `i`. Print `j` inside inner loop.",
            testCases: [{ input: "n=3", output: "123\n12\n1" }]
        },
        simulationType: SimulationType.PATTERN,
        defaultInputs: { patternType: 'num_dec', n: 5 },
        algorithm: [
          'Start',
          'Declare integers i, j, n',
          'Read n',
          'Loop i from n down to 1:',
          '  Loop j from 1 to i:',
          '    Print j',
          '  Print newline',
          'Stop'
        ],
        cCode: `${turboCHeader}    int i, j, n;
    clrscr();
    printf("Enter rows: ");
    scanf("%d", &n);
    for(i=n; i>=1; i--) {
        for(j=1; j<=i; j++) printf("%d", j);
        printf("\\n");
    }${turboCFooter}`
      },
      {
        id: 'u2-p6d',
        title: '6d. Pattern: Increasing Numbers',
        description: 'Display increasing number pattern (e.g. 1, 12, 123...).',
        details: {
            explanation: "Standard triangular number pattern.",
            inputAnalysis: "Integer n.",
            logicConstruction: "Outer loop `i` from 1 to n. Inner loop `j` from 1 to `i`. Print `j`.",
            testCases: [{ input: "n=3", output: "1\n12\n123" }]
        },
        simulationType: SimulationType.PATTERN,
        defaultInputs: { patternType: 'num_inc', n: 5 },
        algorithm: [
          'Start',
          'Declare integers i, j, n',
          'Read n',
          'Loop i from 1 to n:',
          '  Loop j from 1 to i:',
          '    Print j',
          '  Print newline',
          'Stop'
        ],
        cCode: `${turboCHeader}    int i, j, n;
    clrscr();
    printf("Enter rows: ");
    scanf("%d", &n);
    for(i=1; i<=n; i++) {
        for(j=1; j<=i; j++) printf("%d", j);
        printf("\\n");
    }${turboCFooter}`
      },
      {
        id: 'u2-p7a',
        title: '7a. Pattern: Hollow Square',
        description: 'Display a hollow square pattern of stars.',
        details: {
            explanation: "Prints a square where stars appear only on the boundary (borders) and spaces appear inside.",
            inputAnalysis: "Integer n (size of side).",
            logicConstruction: "Iterate through every cell of an n x n grid (loops i and j from 1 to n). Print '*' IF it is the first row, last row, first column, or last column. Otherwise print space.",
            testCases: [{ input: "n=3", output: "***\n* *\n***" }]
        },
        simulationType: SimulationType.PATTERN,
        defaultInputs: { patternType: 'hollow_sq', n: 5 },
        algorithm: [
            'Start',
            'Read n',
            'Loop i from 1 to n:',
            '  Loop j from 1 to n:',
            '    If (i==1 OR i==n OR j==1 OR j==n): Print "*"',
            '    Else: Print " "',
            '  Print newline',
            'Stop'
        ],
        cCode: `${turboCHeader}    int i, j, n;
    clrscr();
    printf("Enter n: ");
    scanf("%d", &n);
    for(i=1; i<=n; i++) {
        for(j=1; j<=n; j++) {
            if(i==1 || i==n || j==1 || j==n) printf("*");
            else printf(" ");
        }
        printf("\\n");
    }${turboCFooter}`
      },
      {
        id: 'u2-p7b',
        title: '7b. Pattern: Number Pyramid',
        description: 'Display a pyramid of numbers (1, 121, 12321...).',
        details: {
            explanation: "A symmetric pyramid where each row `i` has spaces followed by numbers counting up to `i` and then back down.",
            inputAnalysis: "Integer n.",
            logicConstruction: "Requires 3 inner loops/steps inside row loop `i`: 1. Print spaces (n-i). 2. Print ascending numbers (1 to i). 3. Print descending numbers (i-1 down to 1).",
            testCases: [{ input: "n=3", output: "  1\n 121\n12321" }]
        },
        simulationType: SimulationType.PATTERN,
        defaultInputs: { patternType: 'num_pyramid', n: 5 },
        algorithm: [
            'Start',
            'Read n',
            'Loop i from 1 to n:',
            '  Loop k from 1 to (n-i): Print " "',
            '  Loop j from 1 to i: Print j',
            '  Loop j from (i-1) down to 1: Print j',
            '  Print newline',
            'Stop'
        ],
        cCode: `${turboCHeader}    int i, j, n, k;
    clrscr();
    printf("Enter n: ");
    scanf("%d", &n);
    for(i=1; i<=n; i++) {
        for(k=1; k<=n-i; k++) printf(" ");
        for(j=1; j<=i; j++) printf("%d", j);
        for(j=i-1; j>=1; j--) printf("%d", j);
        printf("\\n");
    }${turboCFooter}`
      },
      {
        id: 'u2-p7c',
        title: '7c. Pattern: Square with Diagonals',
        description: 'Display a square with stars on border and diagonals.',
        details: {
            explanation: "Prints a square with borders plus an 'X' inside formed by the main and anti-diagonals.",
            inputAnalysis: "Integer n.",
            logicConstruction: "Loop i, j from 1 to n. Print '*' if: Row is border (i==1, i==n), Col is border (j==1, j==n), Main Diagonal (i==j), Anti Diagonal (j == n - i + 1). Else print space.",
            testCases: [{ input: "n=5", output: "*****\n** **\n* * *\n** **\n*****" }]
        },
        simulationType: SimulationType.PATTERN,
        defaultInputs: { patternType: 'sq_diag', n: 5 },
        algorithm: [
            'Start',
            'Read n',
            'Loop i from 1 to n:',
            '  Loop j from 1 to n:',
            '    If (i==1 OR i==n OR j==1 OR j==n OR i==j OR j==(n-i+1)):',
            '       Print "*"',
            '    Else: Print " "',
            '  Print newline',
            'Stop'
        ],
        cCode: `${turboCHeader}    int i, j, n;
    clrscr();
    printf("Enter n: ");
    scanf("%d", &n);
    for(i=1; i<=n; i++) {
        for(j=1; j<=n; j++) {
            if(i==1||i==n||j==1||j==n||i==j||j==(n-i+1)) 
                printf("*");
            else 
                printf(" ");
        }
        printf("\\n");
    }${turboCFooter}`
      },
      {
        id: 'u2-p7d',
        title: '7d. Pattern: Diamond',
        description: 'Display a diamond pattern of stars.',
        details: {
            explanation: "Constructed by joining a pyramid (Upper Half) and an inverted pyramid (Lower Half).",
            inputAnalysis: "Integer n (half-height).",
            logicConstruction: "Two main parts: 1. Loop i from 1 to n (print spaces n-i, stars 2*i-1). 2. Loop i from n-1 down to 1 (print spaces n-i, stars 2*i-1).",
            testCases: [{ input: "n=3", output: "  *\n ***\n*****\n ***\n  *" }]
        },
        simulationType: SimulationType.PATTERN,
        defaultInputs: { patternType: 'diamond', n: 5 },
        algorithm: [
            'Start',
            'Read n',
            'Loop i from 1 to n (Upper Half):',
            '  Print spaces (n-i)',
            '  Print stars (2*i - 1)',
            'Loop i from n-1 down to 1 (Lower Half):',
            '  Print spaces (n-i)',
            '  Print stars (2*i - 1)',
            'Stop'
        ],
        cCode: `${turboCHeader}    int i, j, n, k;
    clrscr();
    printf("Enter n: ");
    scanf("%d", &n);
    // Upper
    for(i=1; i<=n; i++) {
        for(k=1; k<=n-i; k++) printf(" ");
        for(j=1; j<=2*i-1; j++) printf("*");
        printf("\\n");
    }
    // Lower
    for(i=n-1; i>=1; i--) {
        for(k=1; k<=n-i; k++) printf(" ");
        for(j=1; j<=2*i-1; j++) printf("*");
        printf("\\n");
    }${turboCFooter}`
      },
      {
        id: 'u2-p8a',
        title: '8a. Arithmetic Progression',
        description: 'Display first n terms of an Arithmetic Progression (AP).',
        details: {
            explanation: "An AP is a sequence where the difference between consecutive terms is constant. Example: 2, 4, 6, 8 (diff=2).",
            formula: "T(i) = a + i*d",
            inputAnalysis: "First term (a), common difference (d), number of terms (n).",
            logicConstruction: "Initialize loop counter i from 0 to n-1. In each iteration, calculate `term = a + i*d` and print it.",
            testCases: [{ input: "a=2, d=2, n=5", output: "2, 4, 6, 8, 10" }]
        },
        simulationType: SimulationType.INTERACTIVE_FORM,
        algorithm: [
            'Start',
            'Read a (first term), d (difference), n (count)',
            'Loop i from 0 to n-1:',
            '  Calculate term = a + i*d',
            '  Print term',
            'Stop'
        ],
        cCode: `${turboCHeader}    int a, d, n, i, term;
    clrscr();
    printf("Enter a, d, n: ");
    scanf("%d %d %d", &a, &d, &n);
    printf("AP Series: ");
    for(i=0; i<n; i++) {
        term = a + i*d;
        printf("%d ", term);
    }${turboCFooter}`
      },
      {
        id: 'u2-p8b',
        title: '8b. Geometric Progression',
        description: 'Display first n terms of a Geometric Progression (GP).',
        details: {
            explanation: "A GP is a sequence where each term is found by multiplying the previous term by a fixed number called the common ratio.",
            formula: "T(i) = a * r^i",
            inputAnalysis: "First term (a), common ratio (r), number of terms (n).",
            logicConstruction: "Initialize `term = a`. Loop n times. Print `term`, then update `term = term * r`.",
            testCases: [{ input: "a=2, r=2, n=5", output: "2, 4, 8, 16, 32" }]
        },
        simulationType: SimulationType.INTERACTIVE_FORM,
        algorithm: [
            'Start',
            'Read a (first term), r (ratio), n (count)',
            'Set term = a',
            'Loop i from 0 to n-1:',
            '  Print term',
            '  term = term * r',
            'Stop'
        ],
        cCode: `${turboCHeader}    int a, r, n, i, term;
    clrscr();
    printf("Enter a, r, n: ");
    scanf("%d %d %d", &a, &r, &n);
    printf("GP Series: ");
    term = a;
    for(i=0; i<n; i++) {
        printf("%d ", term);
        term = term * r;
    }${turboCFooter}`
      },
      {
        id: 'u2-p9',
        title: '9. Fibonacci Sequence',
        description: 'Display the first n terms of the Fibonacci sequence.',
        details: {
            explanation: "The Fibonacci sequence starts with 0 and 1, and each subsequent number is the sum of the two preceding ones.",
            formula: "F(n) = F(n-1) + F(n-2)",
            inputAnalysis: "Integer n (number of terms).",
            logicConstruction: "Handle base cases (0, 1) manually. Then use a loop starting from term 3. Maintain two variables `t1` and `t2` for previous terms. `next = t1 + t2`. Shift `t1=t2`, `t2=next`.",
            testCases: [{ input: "n=5", output: "0, 1, 1, 2, 3" }]
        },
        simulationType: SimulationType.CONSOLE,
        algorithm: [
            'Start',
            'Initialize t1=0, t2=1',
            'Read n',
            'Print t1, t2',
            'Loop i from 3 to n:',
            '  nextTerm = t1 + t2',
            '  Print nextTerm',
            '  t1 = t2',
            '  t2 = nextTerm',
            'Stop'
        ],
        cCode: `${turboCHeader}    int n, t1 = 0, t2 = 1, nextTerm, i;
    clrscr();
    printf("Enter number of terms: ");
    scanf("%d", &n);
    printf("Fibonacci Series: %d, %d, ", t1, t2);
    
    for (i = 3; i <= n; ++i) {
        nextTerm = t1 + t2;
        printf("%d, ", nextTerm);
        t1 = t2;
        t2 = nextTerm;
    }${turboCFooter}`
      },
      {
        id: 'u2-p10',
        title: '10. Tribonacci Sequence',
        description: 'Display first n terms of Tribonacci sequence (sum of prev 3).',
        details: {
            explanation: "Similar to Fibonacci, but each term is the sum of the previous three terms. Starts with 0, 1, 1 (or sometimes 0, 0, 1 depending on definition, here using 0, 1, 1).",
            formula: "T(n) = T(n-1) + T(n-2) + T(n-3)",
            inputAnalysis: "Integer n.",
            logicConstruction: "Maintain three variables a, b, c. Loop calculates `d = a+b+c`. Shift values `a=b, b=c, c=d`.",
            testCases: [{ input: "n=6", output: "0 1 1 2 4 7" }]
        },
        simulationType: SimulationType.CONSOLE,
        algorithm: [
            'Start',
            'Initialize a=0, b=1, c=1',
            'Read n',
            'Print a, b, c',
            'Loop i from 4 to n:',
            '  d = a + b + c',
            '  Print d',
            '  Shift values: a=b, b=c, c=d',
            'Stop'
        ],
        cCode: `${turboCHeader}    int n, a=0, b=1, c=1, d, i;
    clrscr();
    printf("Enter n: ");
    scanf("%d", &n);
    printf("%d %d %d ", a, b, c);
    for(i=4; i<=n; i++) {
        d = a + b + c;
        printf("%d ", d);
        a=b; b=c; c=d;
    }${turboCFooter}`
      },
      {
        id: 'u2-p11',
        title: '11. Consecutive Fibonacci Check',
        description: 'Check if two numbers n1 and n2 are consecutive Fibonacci numbers.',
        details: {
            explanation: "Verifies if two inputs appear side-by-side in the Fibonacci sequence (e.g., 5 and 8 are consecutive, 5 and 9 are not).",
            inputAnalysis: "Two integers n1 and n2.",
            logicConstruction: "Generate Fibonacci numbers. If we find a pair (a, b) such that `a==n1` and `b==n2`, return true. Stop generating if `b > n2`.",
            testCases: [
                { input: "5, 8", output: "Yes" },
                { input: "5, 9", output: "No" }
            ]
        },
        simulationType: SimulationType.INTERACTIVE_FORM,
        algorithm: [
            'Start',
            'Initialize a=0, b=1',
            'Read n1, n2',
            'If (n1==0 and n2==1) or (n1==1 and n2==1) set consecutive=true',
            'Else:',
            '  Loop while b < n2:',
            '    c = a + b',
            '    a = b, b = c',
            '    If a == n1 AND b == n2: set consecutive=true',
            'If consecutive is true print "Yes", else "No"',
            'Stop'
        ],
        cCode: `${turboCHeader}    int n1, n2, a=0, b=1, c;
    int isConsecutive = 0;
    clrscr();
    printf("Enter n1 and n2: ");
    scanf("%d %d", &n1, &n2);
    
    if((n1==0 && n2==1) || (n1==1 && n2==1)) isConsecutive = 1;
    else {
        while(b < n2) {
            c = a + b;
            a = b;
            b = c;
            if(a == n1 && b == n2) {
                isConsecutive = 1;
                break;
            }
        }
    }
    
    if(isConsecutive) printf("Yes, consecutive.");
    else printf("No.");${turboCFooter}`
      },
      {
        id: 'u2-p12',
        title: '12. Taylor Series (PI)',
        description: 'Compute approximate value of PI using Taylor series.',
        details: {
            explanation: "Uses the Leibniz formula for PI: pi/4 = 1 - 1/3 + 1/5 - 1/7 + ...",
            formula: "PI = 4 * (Sum of (-1)^i / (2i + 1))",
            inputAnalysis: "Integer n (number of terms for precision).",
            logicConstruction: "Loop i from 0 to n. If i is even, add `1.0/(2*i+1)`. If odd, subtract it. Finally multiply sum by 4.",
            testCases: [{ input: "n=1000", output: "~3.14" }]
        },
        simulationType: SimulationType.CONSOLE,
        algorithm: [
            'Start',
            'Read n',
            'Initialize sum = 0.0',
            'Loop i from 0 to n-1:',
            '  If i is even: sum = sum + 1.0/(2*i+1)',
            '  Else: sum = sum - 1.0/(2*i+1)',
            'Print result = 4 * sum',
            'Stop'
        ],
        cCode: `${turboCHeader}    int n, i;
    float sum = 0.0;
    clrscr();
    printf("Enter n terms: ");
    scanf("%d", &n);
    
    for(i=0; i<n; i++) {
        if(i%2==0) sum += 1.0/(2*i+1);
        else sum -= 1.0/(2*i+1);
    }
    printf("Approx PI: %f", 4*sum);${turboCFooter}`
      },
      {
        id: 'u2-p13',
        title: '13. Taylor Series (e^x)',
        description: 'Compute e^x using Taylor series expansion.',
        details: {
            explanation: "Approximates e^x using the infinite series: 1 + x/1! + x^2/2! + x^3/3! + ...",
            formula: "e^x = Sum(x^i / i!)",
            inputAnalysis: "Float x (exponent), Integer n (terms).",
            logicConstruction: "Efficiently calculate each term by multiplying previous term by `x/i`. `term = term * x / i`. Sum them up.",
            testCases: [{ input: "x=1, n=10", output: "2.718282" }]
        },
        simulationType: SimulationType.CONSOLE,
        algorithm: [
            'Start',
            'Read x and n',
            'Initialize sum=1.0, term=1.0',
            'Loop i from 1 to n-1:',
            '  term = term * x / i',
            '  sum = sum + term',
            'Print sum',
            'Stop'
        ],
        cCode: `${turboCHeader}    int i, n;
    float x, sum=1.0, term=1.0;
    clrscr();
    printf("Enter x and n: ");
    scanf("%f %d", &x, &n);
    
    for(i=1; i<n; i++) {
        term = term * x / i;
        sum = sum + term;
    }
    printf("e^%.1f = %f", x, sum);${turboCFooter}`
      },
      {
        id: 'u2-p14',
        title: '14. Taylor Series (sin/cos)',
        description: 'Compute sin(x) or cos(x) using Taylor series.',
        details: {
            explanation: "Approximates Sine function. Series: x - x^3/3! + x^5/5! - ... (Note: input x must be in radians).",
            formula: "sin(x) = Sum((-1)^k * x^(2k+1) / (2k+1)!)",
            inputAnalysis: "Angle x in degrees (needs conversion), Integer n.",
            logicConstruction: "Convert degrees to radians. Loop. Compute next term using logic `t = -t * x*x / ((2i)*(2i+1))`. This recursive term calculation avoids computing huge factorials directly.",
            testCases: [{ input: "x=30, n=5", output: "0.500000" }]
        },
        simulationType: SimulationType.CONSOLE,
        algorithm: [
            'Start',
            'Read x (degrees) and n',
            'Convert x to radians: x = x * 3.14159 / 180',
            'Initialize t = x, sum = x',
            'Loop i from 1 to n:',
            '  t = (t * (-1) * x * x) / (2*i * (2*i+1))',
            '  sum = sum + t',
            'Print sum',
            'Stop'
        ],
        cCode: `${turboCHeader}    int i, n;
    float x, t, sum;
    clrscr();
    printf("Enter x (degrees) and n: ");
    scanf("%f %d", &x, &n);
    x = x * 3.14159 / 180;
    t = x;
    sum = x;
    
    for(i=1; i<=n; i++) {
        t = (t * (-1) * x * x) / (2*i * (2*i+1));
        sum = sum + t;
    }
    printf("sin(x) = %f", sum);${turboCFooter}`
      }
    ]
  },
  {
    id: UnitId.UNIT_III,
    title: 'Unit III: Arrays & Functions',
    problems: [
      {
        id: 'u3-p1',
        title: '1. Extract Digits',
        description: 'Extract digits of an integer (left to right and right to left).',
        details: {
            explanation: "Demonstrates separating an integer into its constituent digits using modular arithmetic.",
            inputAnalysis: "Long integer n.",
            logicConstruction: "Right-to-Left: `n % 10` gives last digit. `n / 10` removes it. Loop until 0. Left-to-Right: First reverse the number using the R-L logic, then process the reversed number R-L.",
            testCases: [{ input: "123", output: "R-L: 3 2 1, L-R: 1 2 3" }]
        },
        simulationType: SimulationType.CONSOLE,
        algorithm: [
            'Start',
            'Read n',
            '-- Right to Left --',
            'Store n in temp',
            'Loop while temp > 0:',
            '  Print temp % 10',
            '  temp = temp / 10',
            '-- Left to Right --',
            'Store n in temp',
            'Loop while temp > 0: Reverse temp into rev',
            'Loop while rev > 0:',
            '  Print rev % 10',
            '  rev = rev / 10',
            'Stop'
        ],
        cCode: `${turboCHeader}    long n, temp, rev=0;
    int digit;
    clrscr();
    printf("Enter number: ");
    scanf("%ld", &n);
    
    printf("Right to Left: ");
    temp = n;
    while(temp > 0) {
        printf("%d ", temp%10);
        temp /= 10;
    }
    
    temp = n;
    while(temp > 0) {
        rev = rev * 10 + temp%10;
        temp /= 10;
    }
    printf("\\nLeft to Right: ");
    while(rev > 0) {
        printf("%d ", rev%10);
        rev /= 10;
    }${turboCFooter}`
      },
      {
        id: 'u3-p2',
        title: '2. Form Number from Digits',
        description: 'Read sequence of digits (sentinel -1) and form number.',
        details: {
            explanation: "Reconstructs a single integer from a stream of individual digits input by the user.",
            inputAnalysis: "Series of single digits 0-9. Ends with -1.",
            logicConstruction: "Initialize `num = 0`. In a loop, read digit `d`. `num = num * 10 + d`. This shifts current digits left and adds new one at unit place.",
            testCases: [{ input: "2, 5, 4, -1", output: "254" }]
        },
        simulationType: SimulationType.CONSOLE,
        algorithm: [
            'Start',
            'Initialize num = 0',
            'Loop infinite (while 1):',
            '  Read digit d',
            '  If d == -1: Break loop',
            '  num = num * 10 + d',
            'Print num',
            'Stop'
        ],
        cCode: `${turboCHeader}    int d;
    long num = 0;
    clrscr();
    printf("Enter digits (-1 to stop): ");
    while(1) {
        scanf("%d", &d);
        if(d == -1) break;
        num = num * 10 + d;
    }
    printf("Number: %ld", num);${turboCFooter}`
      },
      {
        id: 'u3-p3',
        title: '3. Palindrome Check',
        description: 'Check if a given positive integer number is a palindrome or not.',
        details: {
            explanation: "A palindrome number reads the same forwards and backwards (e.g., 121).",
            inputAnalysis: "Positive integer n.",
            logicConstruction: "1. Copy n to temp. 2. Reverse n (using mod 10 and div 10 logic). 3. Compare reversed number with temp.",
            testCases: [{ input: "121", output: "Palindrome" }, { input: "123", output: "Not Palindrome" }]
        },
        simulationType: SimulationType.INTERACTIVE_FORM,
        algorithm: [
            'Start',
            'Read n',
            'Store n in originalN',
            'Loop while n != 0:',
            '  remainder = n % 10',
            '  reversedN = reversedN * 10 + remainder',
            '  n = n / 10',
            'If originalN == reversedN: Print "Palindrome"',
            'Else: Print "Not a Palindrome"',
            'Stop'
        ],
        cCode: `${turboCHeader}    int n, reversedN = 0, remainder, originalN;
    clrscr();
    printf("Enter an integer: ");
    scanf("%d", &n);
    originalN = n;

    while (n != 0) {
        remainder = n % 10;
        reversedN = reversedN * 10 + remainder;
        n /= 10;
    }

    if (originalN == reversedN)
        printf("%d is a palindrome.", originalN);
    else
        printf("%d is not a palindrome.", originalN);${turboCFooter}`
      },
      {
        id: 'u3-p4',
        title: '4. Grade Calculation',
        description: 'Compute character grade from marks (0-100).',
        details: {
            explanation: "Classifies a numerical score into categorical grades using conditional logic.",
            inputAnalysis: "Integer marks (0-100).",
            logicConstruction: "Use an `if-else if-else` ladder to check ranges descending: check >= 80 first, then >= 60, etc.",
            testCases: [{ input: "85", output: "Grade A" }, { input: "45", output: "Grade D" }]
        },
        simulationType: SimulationType.INTERACTIVE_FORM,
        algorithm: [
            'Start',
            'Read marks',
            'If marks >= 80: Print "Grade A"',
            'Else If marks >= 60: Print "Grade B"',
            'Else If marks >= 50: Print "Grade C"',
            'Else If marks >= 40: Print "Grade D"',
            'Else: Print "Grade F"',
            'Stop'
        ],
        cCode: `${turboCHeader}    int marks;
    clrscr();
    printf("Enter marks: ");
    scanf("%d", &marks);
    
    if(marks >= 80) printf("Grade A");
    else if(marks >= 60) printf("Grade B");
    else if(marks >= 50) printf("Grade C");
    else if(marks >= 40) printf("Grade D");
    else printf("Grade F");${turboCFooter}`
      },
      {
        id: 'u3-p5',
        title: '5. Sum (Sentinel)',
        description: 'Compute sum of numbers entered using sentinel repetition.',
        details: {
            explanation: "Sentinel-controlled loops run until a specific value (sentinel, e.g., -1) is entered. Useful when the number of inputs is not known beforehand.",
            inputAnalysis: "Stream of integers.",
            logicConstruction: "Infinite loop `while(1)`. Read n. If n == -1 break. Else sum += n.",
            testCases: [{ input: "10, 20, 30, -1", output: "Sum: 60" }]
        },
        simulationType: SimulationType.CONSOLE,
        algorithm: [
            'Start',
            'Initialize sum = 0',
            'Loop infinite (while 1):',
            '  Read n',
            '  If n == -1: Break loop',
            '  sum = sum + n',
            'Print sum',
            'Stop'
        ],
        cCode: `${turboCHeader}    int n, sum=0;
    clrscr();
    printf("Enter numbers (-1 to stop): ");
    while(1) {
        scanf("%d", &n);
        if(n == -1) break;
        sum += n;
    }
    printf("Sum: %d", sum);${turboCFooter}`
      },
      {
        id: 'u3-p6',
        title: '6. Prime Number Check',
        description: 'Check if a given positive integer is prime.',
        details: {
            explanation: "A prime number has exactly two factors: 1 and itself. Numbers < 2 are not prime.",
            inputAnalysis: "Integer n.",
            logicConstruction: "Loop `i` from 2 to `n/2`. If `n % i == 0`, it means `i` is a factor, so `n` is not prime. Set flag and break.",
            testCases: [{ input: "7", output: "Prime" }, { input: "10", output: "Not Prime" }]
        },
        simulationType: SimulationType.INTERACTIVE_FORM,
        algorithm: [
            'Start',
            'Read n',
            'Set flag = 1',
            'If n == 0 OR n == 1: Set flag = 0',
            'Loop i from 2 to n/2:',
            '  If n % i == 0: Set flag = 0, Break loop',
            'If flag == 1: Print "Prime"',
            'Else: Print "Not Prime"',
            'Stop'
        ],
        cCode: `${turboCHeader}    int n, i, flag=1;
    clrscr();
    printf("Enter n: ");
    scanf("%d", &n);
    if(n == 0 || n == 1) flag=0;
    for(i=2; i<=n/2; ++i) {
        if(n%i == 0) { flag=0; break; }
    }
    if(flag) printf("Prime");
    else printf("Not Prime");${turboCFooter}`
      },
      {
        id: 'u3-p7',
        title: '7. Prime Factors',
        description: 'Compute prime factors of a positive integer.',
        details: {
            explanation: "Breaking down a number into the product of prime numbers (e.g., 12 = 2 * 2 * 3).",
            inputAnalysis: "Integer n.",
            logicConstruction: "Start divisor `i` at 2. While `n > 1`: If `n % i == 0`, print `i` and divide `n` by `i` (repeat for multiple occurrences of factor). Else increment `i`.",
            testCases: [{ input: "12", output: "2 2 3" }]
        },
        simulationType: SimulationType.CONSOLE,
        algorithm: [
            'Start',
            'Read n',
            'Set i = 2',
            'Loop while n > 1:',
            '  If n % i == 0:',
            '    Print i',
            '    n = n / i',
            '  Else:',
            '    Increment i',
            'Stop'
        ],
        cCode: `${turboCHeader}    int n, i=2;
    clrscr();
    printf("Enter n: ");
    scanf("%d", &n);
    printf("Prime Factors: ");
    while(n > 1) {
        if(n % i == 0) {
            printf("%d ", i);
            n /= i;
        } else {
            i++;
        }
    }${turboCFooter}`
      },
      {
        id: 'u3-p8',
        title: '8. Amicable Numbers',
        description: 'Check if two numbers are amicable (sum of divisors equals each other).',
        details: {
            explanation: "Pairs of numbers where the sum of proper divisors of one equals the other. Example: 220 and 284.",
            inputAnalysis: "Two integers n1, n2.",
            logicConstruction: "Calculate sum of divisors for n1 (loop 1 to n1/2). Calculate sum of divisors for n2. Compare sums.",
            testCases: [{ input: "220, 284", output: "Amicable" }]
        },
        simulationType: SimulationType.INTERACTIVE_FORM,
        algorithm: [
            'Start',
            'Read n1, n2',
            'Initialize sum1=0, sum2=0',
            'Loop i from 1 to n1-1:',
            '  If n1 % i == 0: sum1 += i',
            'Loop i from 1 to n2-1:',
            '  If n2 % i == 0: sum2 += i',
            'If n1 == sum2 AND n2 == sum1:',
            '  Print "Amicable"',
            'Else: Print "Not Amicable"',
            'Stop'
        ],
        cCode: `${turboCHeader}    int n1, n2, sum1=0, sum2=0, i;
    clrscr();
    printf("Enter n1 n2: ");
    scanf("%d %d", &n1, &n2);
    
    for(i=1; i<n1; i++) if(n1%i==0) sum1+=i;
    for(i=1; i<n2; i++) if(n2%i==0) sum2+=i;
    
    if(n1==sum2 && n2==sum1) printf("Amicable");
    else printf("Not Amicable");${turboCFooter}`
      },
      {
        id: 'u3-p9',
        title: '9. Perfect Number',
        description: 'Check if a number is perfect (sum of divisors equals number).',
        details: {
            explanation: "A perfect number is a positive integer that is equal to the sum of its proper positive divisors (excluding the number itself).",
            inputAnalysis: "Integer n.",
            logicConstruction: "Loop `i` from 1 to n/2. Accumulate sum if `n % i == 0`. Check if `sum == n`.",
            testCases: [{ input: "6", output: "Perfect" }, { input: "28", output: "Perfect" }]
        },
        simulationType: SimulationType.INTERACTIVE_FORM,
        algorithm: [
            'Start',
            'Read n',
            'Initialize sum = 0',
            'Loop i from 1 to n-1:',
            '  If n % i == 0: sum = sum + i',
            'If sum == n: Print "Perfect Number"',
            'Else: Print "Not Perfect"',
            'Stop'
        ],
        cCode: `${turboCHeader}    int n, i, sum=0;
    clrscr();
    printf("Enter n: ");
    scanf("%d", &n);
    for(i=1; i<n; i++) {
        if(n%i==0) sum += i;
    }
    if(sum == n) printf("Perfect Number");
    else printf("Not Perfect");${turboCFooter}`
      },
      {
        id: 'u3-p10',
        title: '10. Armstrong Number',
        description: 'Check if sum of cubes of digits equals the number.',
        details: {
            explanation: "An Armstrong number (of order 3) is a number that equals the sum of the cubes of its digits. E.g., 153 = 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153.",
            inputAnalysis: "Integer n.",
            logicConstruction: "Extract digits using modulo 10. Cube them. Sum them. Compare sum to original number.",
            testCases: [{ input: "153", output: "Armstrong" }, { input: "370", output: "Armstrong" }]
        },
        simulationType: SimulationType.INTERACTIVE_FORM,
        algorithm: [
            'Start',
            'Read n',
            'Store n in temp',
            'Initialize sum = 0',
            'Loop while n > 0:',
            '  r = n % 10',
            '  sum = sum + (r * r * r)',
            '  n = n / 10',
            'If temp == sum: Print "Armstrong"',
            'Else: Print "Not Armstrong"',
            'Stop'
        ],
        cCode: `${turboCHeader}    int n, r, sum=0, temp;
    clrscr();
    printf("Enter n: ");
    scanf("%d", &n);
    temp = n;
    while(n>0) {
        r=n%10;
        sum=sum+(r*r*r);
        n=n/10;
    }
    if(temp==sum) printf("Armstrong");
    else printf("Not Armstrong");${turboCFooter}`
      },
      {
        id: 'u3-p11',
        title: '11. Base Conversion',
        description: 'Convert number from one base to another (2 to 10).',
        details: {
            explanation: "Converts a number from Base A to Base B. The universal intermediate is Decimal (Base 10).",
            inputAnalysis: "Number (n), Source Base (b1), Dest Base (b2).",
            logicConstruction: "1. Convert Source to Decimal: `dec += digit * b1^p`. 2. Convert Decimal to Dest: Repeatedly do `dec % b2` to get digits, store in array, then print array in reverse.",
            testCases: [{ input: "n=101, b1=2, b2=10", output: "5" }]
        },
        simulationType: SimulationType.INTERACTIVE_FORM,
        algorithm: [
            'Start',
            'Read n (number), b1 (source base), b2 (dest base)',
            'Initialize dec=0, p=1, i=0',
            '-- Convert Source to Decimal --',
            'Loop while n > 0:',
            '  rem = n % 10',
            '  dec = dec + rem * p',
            '  p = p * b1',
            '  n = n / 10',
            '-- Convert Decimal to Dest --',
            'Loop while dec > 0:',
            '  Store (dec % b2) in array res[i]',
            '  dec = dec / b2',
            '  Increment i',
            'Print array res in reverse order',
            'Stop'
        ],
        cCode: `${turboCHeader}    int n, b1, b2, dec=0, p=1, rem, res[100], i=0, j;
    clrscr();
    printf("Enter number, source base, dest base: ");
    scanf("%d %d %d", &n, &b1, &b2);
    
    // To Decimal
    while(n > 0) {
        rem = n % 10;
        dec = dec + rem * p;
        p = p * b1;
        n = n / 10;
    }
    // To Dest Base
    while(dec > 0) {
        res[i++] = dec % b2;
        dec = dec / b2;
    }
    printf("Result: ");
    for(j=i-1; j>=0; j--) printf("%d", res[j]);${turboCFooter}`
      },
      {
        id: 'u3-p12',
        title: '12. Number to Text',
        description: 'Display a number in text form (e.g., 12 -> ONE TWO).',
        details: {
            explanation: "Reads an integer and prints the English name for each digit. To print in correct order (Left-to-Right), we must process from the most significant digit.",
            inputAnalysis: "Integer n.",
            logicConstruction: "1. Reverse the number first (so 123 becomes 321). 2. Extract digits from reversed number (gets 1, then 2, then 3). 3. Use `switch` case to print 'ONE' for 1, etc.",
            testCases: [{ input: "54", output: "FIVE FOUR" }]
        },
        simulationType: SimulationType.CONSOLE,
        algorithm: [
            'Start',
            'Read n',
            'Reverse n into rev (to process Left-to-Right)',
            'Loop while rev > 0:',
            '  r = rev % 10',
            '  Switch r:',
            '    Case 0: Print "ZERO"',
            '    Case 1: Print "ONE"',
            '    ...',
            '    Case 9: Print "NINE"',
            '  rev = rev / 10',
            'Stop'
        ],
        cCode: `${turboCHeader}    long n, rev=0;
    int r;
    clrscr();
    printf("Enter n: ");
    scanf("%ld", &n);
    while(n>0) { rev = rev*10 + n%10; n/=10; }
    while(rev>0) {
        r = rev % 10;
        switch(r) {
            case 0: printf("ZERO "); break;
            case 1: printf("ONE "); break;
            case 2: printf("TWO "); break;
            case 3: printf("THREE "); break;
            case 4: printf("FOUR "); break;
            case 5: printf("FIVE "); break;
            case 6: printf("SIX "); break;
            case 7: printf("SEVEN "); break;
            case 8: printf("EIGHT "); break;
            case 9: printf("NINE "); break;
        }
        rev /= 10;
    }${turboCFooter}`
      },
       {
        id: 'u3-p13',
        title: '13. Grade Frequency Chart',
        description: 'Compute frequency of grades and display as a horizontal bar chart.',
        details: {
            explanation: "Reads a list of marks, categorizes them into grades (A-F), and counts how many students got each grade. Displays a histogram using asterisks.",
            inputAnalysis: "List of marks (sentinel -1).",
            logicConstruction: "1. Use variables `countA`, `countB` etc. initialized to 0. 2. Read marks in a loop. 3. Increment corresponding counter. 4. After loop, print each label and a loop of '*' equal to count.",
            testCases: [{ input: "85, 90, 65, -1", output: "A: **\nB: *\n..." }]
        },
        simulationType: SimulationType.CHART,
        algorithm: [
            'Start',
            'Initialize counters a=0, b=0, c=0, d=0, f=0',
            'Loop infinite:',
            '  Read marks',
            '  If marks == -1: Break',
            '  If marks >= 80: a++',
            '  Else if marks >= 60: b++',
            '  Else if marks >= 50: c++',
            '  Else if marks >= 40: d++',
            '  Else: f++',
            'Print "A:", then loop a times print "*"',
            'Print "B:", then loop b times print "*"',
            '... (Repeat for C, D, F)',
            'Stop'
        ],
        cCode: `${turboCHeader}    int marks, a=0, b=0, c=0, d=0, f=0, i;
    clrscr();
    printf("Enter marks (-1 to stop):\\n");
    
    while(1) {
        scanf("%d", &marks);
        if(marks == -1) break;
        
        if(marks >= 80) a++;
        else if(marks >= 60) b++;
        else if(marks >= 50) c++;
        else if(marks >= 40) d++;
        else f++;
    }
    
    printf("A: "); for(i=0;i<a;i++) printf("*"); printf("\\n");
    printf("B: "); for(i=0;i<b;i++) printf("*"); printf("\\n");
    printf("C: "); for(i=0;i<c;i++) printf("*"); printf("\\n");
    printf("D: "); for(i=0;i<d;i++) printf("*"); printf("\\n");
    printf("F: "); for(i=0;i<f;i++) printf("*"); printf("\\n");${turboCFooter}`
      },
      {
        id: 'u3-p14',
        title: '14. Min/Max/Avg (Sentinel)',
        description: 'Compute max, min, sum, avg of sequence (sentinel).',
        details: {
            explanation: "Statistical analysis of a stream of numbers without storing them all in an array.",
            inputAnalysis: "Stream of integers.",
            logicConstruction: "Init `min` to huge value, `max` to small value. Loop: read `n`. Update `min` if `n < min`. Update `max` if `n > max`. Add to `sum`. Increment `count`. Calculate avg at end.",
            testCases: [{ input: "10, 20, 5, -1", output: "Min: 5, Max: 20, Sum: 35" }]
        },
        simulationType: SimulationType.CONSOLE,
        algorithm: [
            'Start',
            'Initialize min=32767, max=-32768, sum=0, count=0',
            'Loop infinite:',
            '  Read n',
            '  If n == -1: Break',
            '  If n < min: min = n',
            '  If n > max: max = n',
            '  sum = sum + n',
            '  count++',
            'If count > 0:',
            '  avg = sum / count',
            '  Print Min, Max, Sum, Avg',
            'Stop'
        ],
        cCode: `${turboCHeader}    int n, min=32767, max=-32768, sum=0, count=0;
    float avg;
    clrscr();
    printf("Enter nums (-1 end): ");
    while(1) {
        scanf("%d", &n);
        if(n==-1) break;
        if(n<min) min=n;
        if(n>max) max=n;
        sum+=n;
        count++;
    }
    if(count>0) {
        avg = (float)sum/count;
        printf("Min: %d Max: %d Sum: %d Avg: %.2f", min, max, sum, avg);
    }${turboCFooter}`
      },
      {
        id: 'u3-p15',
        title: '15. BMI Calculator',
        description: 'Compute Body Mass Index and determine weight category.',
        details: {
            explanation: "BMI is a simple calculation using a person's height and weight to categorize weight status.",
            formula: "BMI = Weight(kg) / (Height(m) * Height(m))",
            inputAnalysis: "Weight (float), Height (float).",
            logicConstruction: "Compute formula. Use `if-else` ladder to print category based on ranges (<18.5, 18.5-25, etc).",
            testCases: [{ input: "70kg, 1.75m", output: "BMI 22.86 (Normal)" }]
        },
        simulationType: SimulationType.INTERACTIVE_FORM,
        algorithm: [
            'Start',
            'Read weight (kg) and height (m)',
            'Calculate bmi = weight / (height * height)',
            'Print BMI',
            'If bmi < 18.5: Print "Underweight"',
            'Else if bmi >= 18.5 AND bmi < 25: Print "Normal"',
            'Else if bmi >= 25 AND bmi < 30: Print "Overweight"',
            'Else: Print "Obese"',
            'Stop'
        ],
        cCode: `${turboCHeader}    float weight, height, bmi;
    clrscr();
    printf("Enter weight (kg): ");
    scanf("%f", &weight);
    printf("Enter height (m): ");
    scanf("%f", &height);
    
    bmi = weight / (height * height);
    printf("BMI: %.2f\\n", bmi);
    
    if(bmi < 18.5) printf("Underweight");
    else if(bmi >= 18.5 && bmi < 25) printf("Normal");
    else if(bmi >= 25 && bmi < 30) printf("Overweight");
    else printf("Obese");${turboCFooter}`
      }
    ]
  },
  {
    id: UnitId.UNIT_IV,
    title: 'Unit IV: Modular & Recursive',
    problems: [
      {
        id: 'u4-p1',
        title: '1. Circular Prime',
        description: 'Check if a positive integer is a circular prime.',
        details: {
            explanation: "A circular prime is a number where all rotations of its digits are also prime (e.g., 197 -> 971 -> 719, all are prime).",
            inputAnalysis: "Positive Integer n.",
            logicConstruction: "1. Function `isPrime`. 2. Function `countDigits`. 3. Loop d times (d=digits). Check prime. If not, fail. Rotate number: `(n%10)*10^(d-1) + n/10`.",
            testCases: [{ input: "197", output: "Circular Prime" }]
        },
        simulationType: SimulationType.CONSOLE,
        algorithm: [
            'Start',
            'Define Function isPrime(n): Check if n has factors',
            'Define Function countDigits(n): Return number of digits',
            'Main:',
            '  Read n',
            '  d = countDigits(n)',
            '  Loop d times:',
            '    If isPrime(n) is false: Set flag=0, Break',
            '    Rotate n: n = (n%10)*pow(10, d-1) + (n/10)',
            '  If flag==1: Print "Circular Prime"',
            '  Else: Print "Not Circular Prime"',
            'Stop'
        ],
        cCode: `#include<stdio.h>
#include<conio.h>
#include<math.h>

int isPrime(int n) {
    int i;
    if(n<=1) return 0;
    for(i=2; i*i<=n; i++) if(n%i==0) return 0;
    return 1;
}

int countDigits(int n) {
    int c=0;
    while(n>0) { c++; n/=10; }
    return c;
}

void main() {
    int n, i, d, p, flag=1;
    clrscr();
    printf("Enter n: ");
    scanf("%d", &n);
    d = countDigits(n);
    p = pow(10, d-1);
    
    for(i=0; i<d; i++) {
        if(!isPrime(n)) { flag=0; break; }
        n = (n%10)*p + (n/10); // Rotate
    }
    
    if(flag) printf("Circular Prime");
    else printf("Not Circular Prime");
    getch();
}`
      },
      {
        id: 'u4-p2',
        title: '2. Max of 8 Numbers',
        description: 'Design modular program to compute max of 8 numbers.',
        details: {
            explanation: "Finds the largest value in a fixed-size array.",
            inputAnalysis: "Array of 8 integers.",
            logicConstruction: "Assume first element is max. Loop through rest. If `current > max`, update `max = current`.",
            testCases: [{ input: "1 5 2 8 3 7 4 6", output: "8" }]
        },
        simulationType: SimulationType.CONSOLE,
        algorithm: [
            'Start',
            'Declare array arr[8]',
            'Loop i from 0 to 7: Read arr[i]',
            'Set max = arr[0]',
            'Loop i from 1 to 7:',
            '  If arr[i] > max: max = arr[i]',
            'Print max',
            'Stop'
        ],
        cCode: `${turboCHeader}    int arr[8], i, max;
    clrscr();
    printf("Enter 8 numbers: ");
    for(i=0; i<8; i++) scanf("%d", &arr[i]);
    
    max = arr[0];
    for(i=1; i<8; i++) {
        if(arr[i] > max) max = arr[i];
    }
    printf("Max: %d", max);${turboCFooter}`
      },
      {
        id: 'u4-p3',
        title: '3. Mean, Range, Mode',
        description: 'Compute Mean, Range and Mode of an array.',
        details: {
            explanation: "Statistical operations. Mean: Average. Range: Max - Min. Mode: Most frequent element.",
            inputAnalysis: "Size n, Array elements.",
            logicConstruction: "Mean: Sum/n. Range: Find min and max. Mode: Nested loop to count frequency of each element, keep track of element with highest frequency.",
            testCases: [{ input: "1 2 2 4", output: "Mean: 2.25, Range: 3, Mode: 2" }]
        },
        simulationType: SimulationType.CONSOLE,
        algorithm: [
            'Start',
            'Read n and array arr[n]',
            '-- Calculate Mean --',
            'Sum = sum of elements',
            'Mean = Sum / n',
            '-- Calculate Range --',
            'Find max and min in arr',
            'Range = max - min',
            '-- Calculate Mode --',
            'Nested loop to count frequency of each element',
            'Find element with maxCount',
            'Mode = element',
            'Print Mean, Range, Mode',
            'Stop'
        ],
        cCode: `${turboCHeader}    int arr[20], n, i, j, sum=0, max, min, mode, maxCount=0, count;
    clrscr();
    printf("Enter n: ");
    scanf("%d", &n);
    for(i=0; i<n; i++) {
        scanf("%d", &arr[i]);
        sum+=arr[i];
    }
    max=arr[0]; min=arr[0];
    for(i=0; i<n; i++) {
        if(arr[i]>max) max=arr[i];
        if(arr[i]<min) min=arr[i];
        
        count=0;
        for(j=0; j<n; j++) if(arr[j]==arr[i]) count++;
        if(count > maxCount) { maxCount=count; mode=arr[i]; }
    }
    printf("Mean: %.2f Range: %d Mode: %d", (float)sum/n, max-min, mode);${turboCFooter}`
      },
      {
        id: 'u4-p4',
        title: '4. Median',
        description: 'Compute median of an array.',
        details: {
            explanation: "The median is the middle value in a sorted list. If the list has even elements, it's the average of the two middle ones.",
            inputAnalysis: "Size n, Array elements.",
            logicConstruction: "1. Sort the array (Bubble sort). 2. If n is odd, median is `arr[n/2]`. 3. If n is even, median is `(arr[n/2-1] + arr[n/2])/2`.",
            testCases: [{ input: "1 3 2", output: "2" }, { input: "1 2 3 4", output: "2.5" }]
        },
        simulationType: SimulationType.CONSOLE,
        algorithm: [
            'Start',
            'Read n and array arr[n]',
            'Sort the array (Bubble Sort)',
            '  Loop i from 0 to n:',
            '    Loop j from i+1 to n:',
            '      Swap if arr[i] > arr[j]',
            'If n is odd: Median = arr[n/2]',
            'Else: Median = (arr[n/2-1] + arr[n/2]) / 2.0',
            'Print Median',
            'Stop'
        ],
        cCode: `${turboCHeader}    int arr[20], n, i, j, temp;
    clrscr();
    printf("Enter n: ");
    scanf("%d", &n);
    for(i=0; i<n; i++) scanf("%d", &arr[i]);
    
    // Sort
    for(i=0; i<n; i++)
        for(j=i+1; j<n; j++)
            if(arr[i]>arr[j]) { temp=arr[i]; arr[i]=arr[j]; arr[j]=temp; }
            
    if(n%2 != 0) printf("Median: %d", arr[n/2]);
    else printf("Median: %.2f", (arr[n/2-1]+arr[n/2])/2.0);${turboCFooter}`
      },
      {
        id: 'u4-p5',
        title: '5. String Operations',
        description: 'Implement own string length and string reversal functions.',
        details: {
            explanation: "Manual implementation of `strlen` and `strrev` without library functions.",
            inputAnalysis: "String input.",
            logicConstruction: "Length: Loop until `\\0` is found, counting chars. Reverse: Two pointers, start `i=0` and end `j=len-1`. Swap chars at `i` and `j` while `i<j`.",
            testCases: [{ input: "hello", output: "Length: 5, Rev: olleh" }]
        },
        simulationType: SimulationType.INTERACTIVE_FORM,
        algorithm: [
            'Start',
            'Read string str',
            '-- Length --',
            'Loop while str[len] != NULL: Increment len',
            'Print len',
            '-- Reverse --',
            'Set j = len - 1',
            'Loop i from 0 to j (increment i, decrement j):',
            '  Swap str[i] and str[j]',
            'Print reversed string',
            'Stop'
        ],
        cCode: `${turboCHeader}    char str[100], temp;
    int i = 0, j = 0, len = 0;
    clrscr();
    printf("Enter string: ");
    gets(str);
    
    // Length
    while(str[len] != '\\0') len++;
    printf("Length: %d\\n", len);
    
    // Reverse
    j = len - 1;
    for(i = 0; i < j; i++, j--) {
        temp = str[i];
        str[i] = str[j];
        str[j] = temp;
    }
    printf("Reversed: %s", str);${turboCFooter}`
      },
      {
        id: 'u4-p6',
        title: '6. Matrix Operations',
        description: 'Addition, Subtraction and Transpose of matrices.',
        details: {
            explanation: "Basic Linear Algebra. Add: C[i][j] = A[i][j] + B[i][j]. Transpose: C[i][j] = A[j][i].",
            inputAnalysis: "Two 3x3 matrices.",
            logicConstruction: "Nested loops `i` and `j` from 0 to 2 to access 2D array elements.",
            testCases: [{ input: "A=[[1,2],[3,4]], B=[[1,1],[1,1]]", output: "Sum=[[2,3],[4,5]]" }]
        },
        simulationType: SimulationType.CONSOLE,
        algorithm: [
            'Start',
            'Read Matrix A (3x3) and Matrix B (3x3)',
            '-- Sum --',
            'Loop i 0 to 2, Loop j 0 to 2:',
            '  Print A[i][j] + B[i][j]',
            '-- Transpose A --',
            'Loop i 0 to 2, Loop j 0 to 2:',
            '  Print A[j][i] (Swapped indices)',
            'Stop'
        ],
        cCode: `${turboCHeader}    int a[3][3], b[3][3], i, j;
    clrscr();
    printf("Enter A (3x3):\\n");
    for(i=0; i<3; i++) for(j=0; j<3; j++) scanf("%d", &a[i][j]);
    printf("Enter B (3x3):\\n");
    for(i=0; i<3; i++) for(j=0; j<3; j++) scanf("%d", &b[i][j]);
    
    printf("Sum:\\n");
    for(i=0; i<3; i++) {
        for(j=0; j<3; j++) printf("%d ", a[i][j]+b[i][j]);
        printf("\\n");
    }
    printf("Transpose A:\\n");
    for(i=0; i<3; i++) {
        for(j=0; j<3; j++) printf("%d ", a[j][i]);
        printf("\\n");
    }${turboCFooter}`
      },
      {
        id: 'u4-p7',
        title: '7. Count Digits (Recursive)',
        description: 'Write a recursive program to count the number of digits of a positive integer.',
        details: {
            explanation: "Recursively divides number by 10 until it becomes less than 10.",
            formula: "f(n) = 1 + f(n/10)",
            inputAnalysis: "Integer n.",
            logicConstruction: "Base case: if n < 10, return 1. Recursive case: 1 + countDigits(n/10).",
            testCases: [{ input: "123", output: "3" }]
        },
        simulationType: SimulationType.CONSOLE,
        algorithm: [
            'Start',
            'Define Function countDigits(n):',
            '  If n < 10: return 1 (Base Case)',
            '  Else: return 1 + countDigits(n / 10) (Recursive Step)',
            'Main:',
            '  Read n',
            '  Print countDigits(n)',
            'Stop'
        ],
        cCode: `#include<stdio.h>
#include<conio.h>

int countDigits(int n) {
    if (n < 10) return 1;
    return 1 + countDigits(n / 10);
}

void main() {
    int n;
    clrscr();
    printf("Enter a positive integer: ");
    scanf("%d", &n);
    printf("Number of digits: %d", countDigits(n));
    getch();
}`
      },
      {
        id: 'u4-p8a',
        title: '8a. Factorial (Recursive)',
        description: 'Recursive solution for Factorial.',
        details: {
            explanation: "Factorial n! = n * (n-1)!",
            formula: "n! = n * (n-1)!",
            inputAnalysis: "Integer n.",
            logicConstruction: "Base: if n <= 1 return 1. Recursive: n * fact(n-1).",
            testCases: [{ input: "5", output: "120" }]
        },
        simulationType: SimulationType.INTERACTIVE_FORM,
        algorithm: [
            'Start',
            'Define Function fact(n):',
            '  If n <= 1: Return 1',
            '  Else: Return n * fact(n-1)',
            'Main:',
            '  Read n',
            '  Print fact(n)',
            'Stop'
        ],
        cCode: `#include<stdio.h>
#include<conio.h>
long fact(int n) {
    if(n<=1) return 1;
    return n * fact(n-1);
}
void main() {
    int n;
    clrscr();
    printf("Enter n: ");
    scanf("%d", &n);
    printf("Fact: %ld", fact(n));
    getch();
}`
      },
      {
        id: 'u4-p8b',
        title: '8b. Digits L-R (Recursive)',
        description: 'Display digits left to right recursively.',
        details: {
            explanation: "Uses recursion to go deep to the first digit, print it, then unwind.",
            inputAnalysis: "Integer n.",
            logicConstruction: "Function calls itself with `n/10` BEFORE printing `n%10`. This ensures the first digit is printed first (Head recursion vs Tail recursion concept).",
            testCases: [{ input: "123", output: "1 2 3" }]
        },
        simulationType: SimulationType.CONSOLE,
        algorithm: [
            'Start',
            'Define Function disp(n):',
            '  If n / 10 > 0: Call disp(n / 10) (Recursive Call)',
            '  Print n % 10 (Print after return)',
            'Main:',
            '  Read n',
            '  Call disp(n)',
            'Stop'
        ],
        cCode: `#include<stdio.h>
#include<conio.h>
void disp(int n) {
    if(n/10 > 0) disp(n/10);
    printf("%d ", n%10);
}
void main() {
    int n;
    clrscr();
    scanf("%d", &n);
    disp(n);
    getch();
}`
      },
      {
        id: 'u4-p8c',
        title: '8c. Power (Recursive)',
        description: 'Compute x^y using recursion.',
        details: {
            explanation: "Repeated multiplication expressed recursively.",
            formula: "x^y = x * x^(y-1)",
            inputAnalysis: "Base x, Exponent y.",
            logicConstruction: "Base: y==0 return 1. Recursive: x * power(x, y-1).",
            testCases: [{ input: "2, 3", output: "8" }]
        },
        simulationType: SimulationType.INTERACTIVE_FORM,
        algorithm: [
            'Start',
            'Define Function power(x, y):',
            '  If y == 0: Return 1',
            '  Else: Return x * power(x, y - 1)',
            'Main:',
            '  Read x, y',
            '  Print power(x, y)',
            'Stop'
        ],
        cCode: `#include<stdio.h>
#include<conio.h>
long power(int x, int y) {
    if(y==0) return 1;
    return x * power(x, y-1);
}
void main() {
    int x,y;
    clrscr();
    scanf("%d %d", &x, &y);
    printf("%ld", power(x,y));
    getch();
}`
      },
      {
        id: 'u4-p8d',
        title: '8d. Reverse Sequence (Recursive)',
        description: 'Print sentinel sequence in reverse order recursively.',
        details: {
            explanation: "Simulates a stack. Reads a number, recurses, then prints. This effectively prints the last entered number first.",
            inputAnalysis: "Stream of numbers ending in -1.",
            logicConstruction: "Function `rev()`: Read `n`. If `n != -1`, call `rev()`. Print `n`. The print happens during the unwinding phase of recursion.",
            testCases: [{ input: "1 2 3 -1", output: "3 2 1" }]
        },
        simulationType: SimulationType.CONSOLE,
        algorithm: [
            'Start',
            'Define Function rev():',
            '  Read n',
            '  If n != -1:',
            '    Call rev() (Recursive Step)',
            '    Print n (Print after recursion returns)',
            'Main:',
            '  Print prompt',
            '  Call rev()',
            'Stop'
        ],
        cCode: `#include<stdio.h>
#include<conio.h>
void rev() {
    int n;
    scanf("%d", &n);
    if(n != -1) {
        rev();
        printf("%d ", n);
    }
}
void main() {
    clrscr();
    printf("Enter numbers (-1 end): ");
    rev();
    getch();
}`
      }
    ]
  }
];
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config({ path: path.join(__dirname, "../.env") });

const User = require("../models/User");
const Question = require("../models/Question");
const Quiz = require("../models/Quiz");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected for seeding...");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

// ─── USERS ───────────────────────────────────────────────
const users = [
  {
    name: "Admin User",
    email: "admin@placeprep.com",
    password: "admin123",
    role: "admin",
  },
  {
    name: "Rahul Sharma",
    email: "rahul@student.com",
    password: "student123",
    role: "student",
  },
  {
    name: "Priya Singh",
    email: "priya@student.com",
    password: "student123",
    role: "student",
  },
  {
    name: "Arjun Patel",
    email: "arjun@student.com",
    password: "student123",
    role: "student",
  },
  {
    name: "Sneha Reddy",
    email: "sneha@student.com",
    password: "student123",
    role: "student",
  },
  {
    name: "Kiran Kumar",
    email: "kiran@student.com",
    password: "student123",
    role: "student",
  },
];

// ─── QUESTIONS ───────────────────────────────────────────
const questions = [
  // DSA
  {
    text: "What is the time complexity of binary search?",
    type: "mcq",
    options: [
      { label: "A", value: "O(n)" },
      { label: "B", value: "O(log n)" },
      { label: "C", value: "O(n log n)" },
      { label: "D", value: "O(1)" },
    ],
    answer: "O(log n)",
    explanation: "Binary search divides the array in half each time, giving O(log n) complexity.",
    difficulty: "easy",
    category: "DSA",
    tags: ["searching", "algorithms"],
  },
  {
    text: "Which data structure uses LIFO order?",
    type: "mcq",
    options: [
      { label: "A", value: "Queue" },
      { label: "B", value: "Stack" },
      { label: "C", value: "Linked List" },
      { label: "D", value: "Tree" },
    ],
    answer: "Stack",
    explanation: "Stack follows Last In First Out (LIFO) principle.",
    difficulty: "easy",
    category: "DSA",
    tags: ["stack", "data structures"],
  },
  {
    text: "What is the worst case time complexity of QuickSort?",
    type: "mcq",
    options: [
      { label: "A", value: "O(n log n)" },
      { label: "B", value: "O(n)" },
      { label: "C", value: "O(n²)" },
      { label: "D", value: "O(log n)" },
    ],
    answer: "O(n²)",
    explanation: "QuickSort worst case occurs when pivot is always the smallest or largest element.",
    difficulty: "medium",
    category: "DSA",
    tags: ["sorting", "algorithms"],
  },
  {
    text: "Which traversal of a BST gives sorted output?",
    type: "mcq",
    options: [
      { label: "A", value: "Preorder" },
      { label: "B", value: "Postorder" },
      { label: "C", value: "Inorder" },
      { label: "D", value: "Level order" },
    ],
    answer: "Inorder",
    explanation: "Inorder traversal (Left → Root → Right) of BST gives sorted ascending order.",
    difficulty: "medium",
    category: "DSA",
    tags: ["trees", "BST"],
  },
  {
    text: "What is the space complexity of merge sort?",
    type: "mcq",
    options: [
      { label: "A", value: "O(1)" },
      { label: "B", value: "O(log n)" },
      { label: "C", value: "O(n)" },
      { label: "D", value: "O(n²)" },
    ],
    answer: "O(n)",
    explanation: "Merge sort requires O(n) extra space for the temporary arrays during merging.",
    difficulty: "medium",
    category: "DSA",
    tags: ["sorting", "space complexity"],
  },

  // OS
  {
    text: "What is a deadlock in operating systems?",
    type: "mcq",
    options: [
      { label: "A", value: "A process waiting for CPU" },
      { label: "B", value: "Two or more processes waiting indefinitely for each other" },
      { label: "C", value: "A process using 100% CPU" },
      { label: "D", value: "Memory overflow error" },
    ],
    answer: "Two or more processes waiting indefinitely for each other",
    explanation: "Deadlock occurs when processes are blocked forever, each waiting for a resource held by another.",
    difficulty: "medium",
    category: "OS",
    tags: ["deadlock", "processes"],
  },
  {
    text: "Which page replacement algorithm suffers from Belady's anomaly?",
    type: "mcq",
    options: [
      { label: "A", value: "LRU" },
      { label: "B", value: "Optimal" },
      { label: "C", value: "FIFO" },
      { label: "D", value: "LFU" },
    ],
    answer: "FIFO",
    explanation: "FIFO can have more page faults with more frames — this is Belady's anomaly.",
    difficulty: "hard",
    category: "OS",
    tags: ["memory management", "page replacement"],
  },
  {
    text: "What is a context switch?",
    type: "mcq",
    options: [
      { label: "A", value: "Switching between two programs by the user" },
      { label: "B", value: "Saving and restoring state of a process so CPU can be shared" },
      { label: "C", value: "Switching the OS kernel" },
      { label: "D", value: "Moving data from RAM to disk" },
    ],
    answer: "Saving and restoring state of a process so CPU can be shared",
    explanation: "Context switch saves the state of the current process and loads the saved state of another.",
    difficulty: "easy",
    category: "OS",
    tags: ["scheduling", "processes"],
  },

  // DBMS
  {
    text: "Which normal form eliminates transitive dependencies?",
    type: "mcq",
    options: [
      { label: "A", value: "1NF" },
      { label: "B", value: "2NF" },
      { label: "C", value: "3NF" },
      { label: "D", value: "BCNF" },
    ],
    answer: "3NF",
    explanation: "3NF eliminates transitive dependencies where non-key attributes depend on other non-key attributes.",
    difficulty: "medium",
    category: "DBMS",
    tags: ["normalization", "3NF"],
  },
  {
    text: "What does ACID stand for in databases?",
    type: "mcq",
    options: [
      { label: "A", value: "Atomicity, Consistency, Isolation, Durability" },
      { label: "B", value: "Accuracy, Consistency, Integrity, Durability" },
      { label: "C", value: "Atomicity, Concurrency, Isolation, Dependency" },
      { label: "D", value: "Accuracy, Concurrency, Integrity, Dependency" },
    ],
    answer: "Atomicity, Consistency, Isolation, Durability",
    explanation: "ACID properties ensure reliable processing of database transactions.",
    difficulty: "easy",
    category: "DBMS",
    tags: ["transactions", "ACID"],
  },
  {
    text: "What is the difference between DELETE and TRUNCATE?",
    type: "mcq",
    options: [
      { label: "A", value: "No difference" },
      { label: "B", value: "DELETE removes all rows, TRUNCATE removes specific rows" },
      { label: "C", value: "DELETE can be rolled back, TRUNCATE cannot" },
      { label: "D", value: "TRUNCATE is slower than DELETE" },
    ],
    answer: "DELETE can be rolled back, TRUNCATE cannot",
    explanation: "DELETE is a DML operation that can be rolled back. TRUNCATE is DDL and cannot be rolled back.",
    difficulty: "medium",
    category: "DBMS",
    tags: ["SQL", "DDL", "DML"],
  },

  // Aptitude
  {
    text: "If a train travels 60 km in 1 hour, how long will it take to travel 150 km?",
    type: "mcq",
    options: [
      { label: "A", value: "2 hours" },
      { label: "B", value: "2.5 hours" },
      { label: "C", value: "3 hours" },
      { label: "D", value: "1.5 hours" },
    ],
    answer: "2.5 hours",
    explanation: "Speed = 60 km/h. Time = Distance/Speed = 150/60 = 2.5 hours.",
    difficulty: "easy",
    category: "Aptitude",
    tags: ["speed", "distance", "time"],
  },
  {
    text: "What is 15% of 200?",
    type: "mcq",
    options: [
      { label: "A", value: "20" },
      { label: "B", value: "25" },
      { label: "C", value: "30" },
      { label: "D", value: "35" },
    ],
    answer: "30",
    explanation: "15% of 200 = (15/100) × 200 = 30.",
    difficulty: "easy",
    category: "Aptitude",
    tags: ["percentage", "arithmetic"],
  },
  {
    text: "A can do a work in 10 days, B in 15 days. How many days together?",
    type: "mcq",
    options: [
      { label: "A", value: "5 days" },
      { label: "B", value: "6 days" },
      { label: "C", value: "8 days" },
      { label: "D", value: "12 days" },
    ],
    answer: "6 days",
    explanation: "Combined rate = 1/10 + 1/15 = 3/30 + 2/30 = 5/30 = 1/6. So together = 6 days.",
    difficulty: "medium",
    category: "Aptitude",
    tags: ["work", "time"],
  },

  // HR
  {
    text: "What is your greatest strength?",
    type: "hr",
    options: [
      { label: "A", value: "Technical skills only" },
      { label: "B", value: "Problem solving and teamwork" },
      { label: "C", value: "Working alone" },
      { label: "D", value: "Following instructions only" },
    ],
    answer: "Problem solving and teamwork",
    explanation: "Employers value both technical and soft skills like problem solving and collaboration.",
    difficulty: "easy",
    category: "HR",
    tags: ["behavioral", "strengths"],
  },
  {
    text: "Where do you see yourself in 5 years?",
    type: "hr",
    options: [
      { label: "A", value: "In a managerial role with expertise in my domain" },
      { label: "B", value: "Same position as today" },
      { label: "C", value: "I have no plans" },
      { label: "D", value: "Working at a competitor company" },
    ],
    answer: "In a managerial role with expertise in my domain",
    explanation: "Showing ambition aligned with company growth is the ideal answer.",
    difficulty: "easy",
    category: "HR",
    tags: ["career goals", "behavioral"],
  },

  // Networking
  {
    text: "What is the full form of HTTP?",
    type: "mcq",
    options: [
      { label: "A", value: "HyperText Transfer Protocol" },
      { label: "B", value: "High Transfer Text Protocol" },
      { label: "C", value: "HyperText Transmission Protocol" },
      { label: "D", value: "Hybrid Text Transfer Protocol" },
    ],
    answer: "HyperText Transfer Protocol",
    explanation: "HTTP stands for HyperText Transfer Protocol, used for web communication.",
    difficulty: "easy",
    category: "Networking",
    tags: ["protocols", "web"],
  },
  {
    text: "Which layer of OSI model handles routing?",
    type: "mcq",
    options: [
      { label: "A", value: "Data Link Layer" },
      { label: "B", value: "Transport Layer" },
      { label: "C", value: "Network Layer" },
      { label: "D", value: "Session Layer" },
    ],
    answer: "Network Layer",
    explanation: "The Network Layer (Layer 3) handles routing and forwarding of packets.",
    difficulty: "medium",
    category: "Networking",
    tags: ["OSI", "routing"],
  },

  // OOP
  {
    text: "Which OOP concept allows a class to inherit properties from multiple classes?",
    type: "mcq",
    options: [
      { label: "A", value: "Single Inheritance" },
      { label: "B", value: "Multiple Inheritance" },
      { label: "C", value: "Encapsulation" },
      { label: "D", value: "Polymorphism" },
    ],
    answer: "Multiple Inheritance",
    explanation: "Multiple inheritance allows a class to inherit from more than one parent class.",
    difficulty: "easy",
    category: "OOP",
    tags: ["inheritance", "OOP"],
  },
  {
    text: "What is method overriding?",
    type: "mcq",
    options: [
      { label: "A", value: "Defining two methods with the same name in one class" },
      { label: "B", value: "Redefining a parent class method in a child class" },
      { label: "C", value: "Hiding a method from other classes" },
      { label: "D", value: "Calling a method from another class" },
    ],
    answer: "Redefining a parent class method in a child class",
    explanation: "Method overriding allows a subclass to provide a specific implementation of a method in the parent class.",
    difficulty: "medium",
    category: "OOP",
    tags: ["polymorphism", "overriding"],
  },
];

// ─── SEED FUNCTION ───────────────────────────────────────
const seedDB = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Question.deleteMany();
    await Quiz.deleteMany();
    console.log("🗑️  Cleared existing data");

    // Seed users
    const createdUsers = await User.create(users);
    const adminUser = createdUsers.find((u) => u.role === "admin");
    console.log(`👤 Created ${createdUsers.length} users`);

    // Seed questions
    const questionsWithCreator = questions.map((q) => ({
      ...q,
      createdBy: adminUser._id,
    }));
    const createdQuestions = await Question.create(questionsWithCreator);
    console.log(`❓ Created ${createdQuestions.length} questions`);

    // Helper to get question IDs by category
    const getQuestionsByCategory = (category, count) =>
      createdQuestions
        .filter((q) => q.category === category)
        .slice(0, count)
        .map((q) => q._id);

    // Seed quizzes
    const quizzes = [
      {
        title: "DSA Fundamentals",
        description: "Test your Data Structures and Algorithms knowledge",
        questions: getQuestionsByCategory("DSA", 5),
        duration: 15,
        category: "DSA",
        difficulty: "mixed",
        totalMarks: 5,
        createdBy: adminUser._id,
      },
      {
        title: "Operating Systems Basics",
        description: "Test your OS concepts and knowledge",
        questions: getQuestionsByCategory("OS", 3),
        duration: 10,
        category: "OS",
        difficulty: "mixed",
        totalMarks: 3,
        createdBy: adminUser._id,
      },
      {
        title: "DBMS Essentials",
        description: "Test your Database Management concepts",
        questions: getQuestionsByCategory("DBMS", 3),
        duration: 10,
        category: "DBMS",
        difficulty: "mixed",
        totalMarks: 3,
        createdBy: adminUser._id,
      },
      {
        title: "Aptitude & Reasoning",
        description: "Practice aptitude questions for placements",
        questions: getQuestionsByCategory("Aptitude", 3),
        duration: 10,
        category: "Aptitude",
        difficulty: "easy",
        totalMarks: 3,
        createdBy: adminUser._id,
      },
    ];

    const createdQuizzes = await Quiz.create(quizzes);
    console.log(`📝 Created ${createdQuizzes.length} quizzes`);

    console.log("\n✅ Database seeded successfully!");
    console.log("─────────────────────────────────");
    console.log("Admin Login:");
    console.log("  Email   : admin@placeprep.com");
    console.log("  Password: admin123");
    console.log("─────────────────────────────────");
    console.log("Student Login:");
    console.log("  Email   : rahul@student.com");
    console.log("  Password: student123");
    console.log("─────────────────────────────────");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error.message);
    process.exit(1);
  }
};

seedDB();
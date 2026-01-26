SYLLABUS_DATA = {
    'python': {
        'title': 'Python Programming Mastery',
        'description': 'Master the world\'s most versatile language. From automation to data science, build a powerful career foundation with expert-led Python training.',
        'modules': [
            {
                'title': 'MODULE 1: Python Basics',
                'topics': [
                    'Introduction to Python programming',
                    'Variables, data types, and operators',
                    'Control structures (if/else, loops)',
                    'Functions and scope',
                    'Error handling and debugging'
                ]
            },
            {
                'title': 'MODULE 2: Data Structures',
                'topics': [
                    'Lists, tuples, and dictionaries',
                    'Sets and their operations',
                    'String manipulation techniques',
                    'File handling and I/O operations',
                    'Working with JSON data'
                ]
            },
            {
                'title': 'MODULE 3: Libraries & Applications',
                'topics': [
                    'NumPy for numerical computing',
                    'Pandas for data analysis',
                    'Matplotlib for data visualization',
                    'Web scraping with BeautifulSoup',
                    'API integration and requests'
                ]
            },
            {
                'title': 'MODULE 4: Projects & Deployment',
                'topics': [
                    'Building real-world projects',
                    'Version control with Git',
                    'Testing and code quality',
                    'Deployment strategies',
                    'Best practices and optimization'
                ]
            }
        ]
    },
    'java': {
        'title': 'Java Full Stack Development',
        'description': 'Comprehensive Java training covering core Java, enterprise frameworks, and front-end technologies.',
        'modules': [
            {
                'title': 'MODULE 1: Core Java Fundamentals',
                'topics': ['Java Syntax', 'OOP Concepts', 'Exception Handling', 'Collections Framework']
            },
            {
                'title': 'MODULE 2: Advanced Java & Databases',
                'topics': ['JDBC', 'Servlets & JSP', 'SQL Fundamentals', 'Hibernate ORM']
            },
            {
                'title': 'MODULE 3: Spring Framework',
                'topics': ['Spring Boot', 'Spring MVC', 'REST APIs with Spring', 'Spring Security']
            },
            {
                'title': 'MODULE 4: Front-end Integration',
                'topics': ['React/Angular Basics', 'Integrating Backend with UI', 'Deployment']
            }
        ]
    },
    'mern': {
        'title': 'MERN Stack Development with AI',
        'description': 'Build modern web applications using MongoDB, Express, React, and Node.js with AI integration.',
        'modules': [
            {
                'title': 'MODULE 1: Frontend Excellence (React)',
                'topics': ['Hooks & Context API', 'State Management', 'Tailwind CSS', 'Responsive Design']
            },
            {
                'title': 'MODULE 2: Backend Mastery (Node & Express)',
                'topics': ['Server architecture', 'RESTful API Design', 'Authentication/Authorization', 'Middleware']
            },
            {
                'title': 'MODULE 3: Database & Cloud (MongoDB)',
                'topics': ['NoSQL modeling', 'Mongoose ODM', 'Aggregation Framework', 'Cloud Hosting']
            },
            {
                'title': 'MODULE 4: AI Integration',
                'topics': ['OpenAI API', 'Implementing Chatbots', 'AI-assisted coding', 'Vector Databases']
            }
        ]
    },
    'general': {
        'title': 'Advanced Industry-Ready Training',
        'description': 'Master high-demand tech skills with our comprehensive certification programs focused on real-world projects and career growth.',
        'modules': [
            {
                'title': 'MODULE 1: Foundation & Tools',
                'topics': ['Core Concepts', 'Software Tools', 'Industry Best Practices', 'Setting up Environment']
            },
            {
                'title': 'MODULE 2: Core Development',
                'topics': ['Language Fundamentals', 'Architecture Design', 'Design Patterns', 'Data Management']
            },
            {
                'title': 'MODULE 3: Advanced Applications',
                'topics': ['Advanced Features', 'Framework Integration', 'Security Best Practices', 'Performance Optimization']
            },
            {
                'title': 'MODULE 4: Career & Projects',
                'topics': ['Resume Building', 'Interview Preparation', 'Final Capstone Project', 'Job Placement Support']
            }
        ]
    }
}

# Mapping for common variations
SYLLABUS_MAPPING = {
    'python + dsa with ai': 'python',
    'python programming': 'python',
    'java full stack with ai': 'java',
    'mern stack': 'mern',
    'mern stack development': 'mern',
    'data analyst with ai': 'general',
    'data science with ai': 'general',
    'cyber security with ai': 'general',
    'automation testing with ai': 'general',
    'generative ai & llm': 'mern',
    'machine learning with ai': 'python',
    'power bi with ai': 'general',
    'advanced excel with ai': 'general'
}

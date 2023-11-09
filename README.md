# CyberChatter Spring Web Application

CyberChatter is a real-time chat application built using the Spring Boot framework with WebSocket support. This application enables users to engage in real-time communication, including private messaging and group chats.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Real-Time Chat:**

  - Utilizes Spring WebSocket for seamless real-time communication.
  - Supports private messaging and group chat functionality.

- **User Management:**

  - Secure user authentication and authorization using Spring Security.
  - Displays user online/offline status.
  - Provides customizable user profiles.

- **Message Handling:**

  - Persists chat messages in a database for users to access past conversations.
  - Supports message formatting and file attachments.

- **Enhanced User Experience:**

  - Implements notifications for new messages and user status changes.
  - Allows users to customize their experience with themes.

- **Security:**

  - Follows secure coding practices to ensure data integrity and user safety.
  - Validates and sanitizes user input to prevent security vulnerabilities.

- **Scalability:**

  - Designed to handle scalability with potential for a growing user base.

- **Testing and CI/CD:**
  - Includes comprehensive testing, including unit tests, integration tests, and end-to-end tests.
  - Utilizes Continuous Integration and Deployment (CI/CD) pipelines for automated testing and deployment.

## Getting Started

### Prerequisites

- Java Development Kit (JDK) 8 or later
- Apache Maven
- MySQL or another relational database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/cyberchatter.git
   ```

### Build

```bash cd cyberchatter
mvn clean install
```

### Run

```
java -jar target/cyberchatter-0.0.1-SNAPSHOT.jar
```

### Usage

```
1) Open your browser and navigate to http://localhost:8080.

2) Register or log in to start using CyberChatter.

3) Explore real-time chat, private messaging, and group chats.

```

### Configuration

Database Configuration

CyberChatter uses MySQL by default. You can modify the database configuration in the `application.properties` file.

```
spring.datasource.url=jdbc:mysql://localhost:3306/cyberchatter
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### Contributing

Feel free to contribute to the project by opening issues or submitting pull requests. Your contributions are welcome!

### License

MIT License

Copyright (c) 2023 Paul Adams

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

# 🍌 Banana Index

A fun and interactive web application that tracks banana prices and ripeness levels across different countries around the world! This project is specifically designed to demonstrate the powerful features of **Neon's MCP Server** with a modern web interface.

## About This Demo

This application showcases how Neon's MCP Server can be used to:

- **Database Integration**: Seamlessly connect to Neon's serverless Postgres database
- **Real-time Data Management**: Handle CRUD operations with automatic scaling
- **API Development**: Build RESTful APIs with Neon's robust backend capabilities
- **Modern Web Development**: Create responsive, interactive web applications
- **Production-Ready Features**: Demonstrate Neon's enterprise-grade database features

## Features

- 🌍 **Global Banana Tracking**: View banana prices and ripeness from countries worldwide
- 📊 **Real-time Statistics**: See average prices and ripeness across all countries
- ➕ **Add New Countries**: Easily add new countries to the index
- 🗑️ **Remove Countries**: Delete countries from the index
- 🎨 **Beautiful UI**: Modern, responsive design with fun animations
- 🚀 **In-Memory Storage**: Fast performance with in-memory data storage

## Tech Stack

- **Backend**: Node.js with Express
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Database**: Neon's MCP Server (PostgreSQL)
- **Storage**: In-memory (ready for Neon database integration)
- **Styling**: Modern CSS with gradients and animations

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd banana-index
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Production

To run in production mode:

```bash
npm start
```

## API Endpoints

The application provides a RESTful API for managing banana data:

- `GET /api/bananas` - Get all countries in the index
- `POST /api/bananas` - Add a new country to the index
- `GET /api/bananas/:id` - Get a specific country by ID
- `PUT /api/bananas/:id` - Update a country's data
- `DELETE /api/bananas/:id` - Remove a country from the index

### Example API Usage

```bash
# Get all bananas
curl http://localhost:3000/api/bananas

# Add a new country
curl -X POST http://localhost:3000/api/bananas \
  -H "Content-Type: application/json" \
  -d '{
    "country": "Japan",
    "pricePerKg": 2.50,
    "averageRipeness": 8.5,
    "currency": "USD"
  }'
```

## Data Structure

Each country entry contains:

```json
{
  "id": 1,
  "country": "Ecuador",
  "pricePerKg": 1.2,
  "averageRipeness": 7.5,
  "currency": "USD",
  "lastUpdated": "2024-01-15"
}
```

## Neon MCP Server Integration

This demo is designed to showcase Neon's MCP Server capabilities. The current version uses in-memory storage, but it's structured to easily integrate with Neon's serverless Postgres database through the MCP Server.

### Planned Neon Features:

- [ ] **Database Migration**: Use Neon's MCP Server to create and manage database schemas
- [ ] **Real-time Queries**: Leverage Neon's branching for development and testing
- [ ] **Connection Management**: Utilize Neon's connection pooling and serverless scaling
- [ ] **Data Persistence**: Store banana index data in Neon's Postgres database
- [ ] **Performance Optimization**: Use Neon's query tuning and optimization features
- [ ] **Backup & Recovery**: Demonstrate Neon's automatic backups and point-in-time recovery

## Future Enhancements

- [ ] User authentication with Neon Auth
- [ ] Historical price tracking with time-series data
- [ ] Price alerts and notifications
- [ ] Export functionality
- [ ] Mobile app
- [ ] Real-time price updates
- [ ] Currency conversion
- [ ] Seasonal price analysis

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Fun Facts

- 🍌 Bananas are the world's most popular fruit
- 🌍 Over 100 billion bananas are consumed annually
- 📈 The global banana market is worth over $25 billion
- 🚢 Most bananas travel thousands of miles to reach consumers

---

**Note**: This is a demo project designed to showcase Neon's MCP Server capabilities. The banana prices and ripeness data are fictional and for demonstration purposes only. This application demonstrates how developers can build modern web applications that integrate seamlessly with Neon's serverless Postgres database through the MCP Server.

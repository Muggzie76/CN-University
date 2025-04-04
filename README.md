# CN University Learning Platform

This is a simple web application built to run on the Internet Computer Protocol (ICP). The platform is designed to teach users about developing on the Internet Computer through interactive modules and tutorials.

## Project Structure

```
simple_project/
├── assets/             # Frontend assets for the canister
│   ├── css/            # CSS stylesheets
│   ├── js/             # JavaScript files
│   ├── images/         # Image assets
│   │   └── team/       # Team member photos
│   ├── index.html      # Main landing page
│   ├── modules.html    # Modules listing page
│   ├── about.html      # About page
│   └── .ic-assets.json # Assets config for IC
└── dfx.json            # DFX configuration
```

## Features

- Interactive learning modules for ICP development
- Progress tracking system
- Token-based rewards for completing modules
- Responsive design for desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- DFX SDK (v0.14.0 or higher)
- Internet Computer Wallet for deployment

### Local Development

1. Clone this repository
```bash
git clone https://github.com/yourusername/cn-university.git
cd cn-university/simple_project
```

2. Start the local Internet Computer replica
```bash
dfx start --background
```

3. Deploy the project locally
```bash
dfx deploy
```

4. Open the application in your browser
```
http://localhost:8000/?canisterId=<canister_id>
```

### Production Deployment

To deploy to the IC mainnet:

1. Ensure you have sufficient cycles in your wallet

2. Deploy to mainnet
```bash
dfx deploy --network ic
```

## Customization

You can customize the learning modules by modifying the data in `assets/js/main.js`. In a production environment, this data would come from the backend canister.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

If you have any questions or feedback, please reach out to us at contact@cnuniversity.io

## Admin Dashboard

The admin dashboard provides a comprehensive interface for managing the CN University platform. It includes:

- **Dashboard Overview**: Statistics and charts showing platform activity
- **Module Management**: Create, edit, and delete learning modules
- **User Management**: View and manage user accounts
- **Admin Management**: Add and remove admin users
- **System Monitoring**: Monitor canister cycles, memory usage, and performance
- **Activity Logs**: View system activity and filter logs by level and date

### Accessing the Admin Dashboard

The admin dashboard is available at `/admin/index.html` and requires admin credentials to access.

### Technical Notes

- The admin dashboard uses a bundled JavaScript file that includes all UI functionality
- All data operations currently use mock implementations and would need to be connected to backend canisters in production
- The admin interface is fully responsive and works on desktop and mobile devices 
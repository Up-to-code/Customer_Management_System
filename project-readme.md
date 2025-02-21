# Customer Management System

![Customer Management Dashboard](/crm.png)

## Overview

This project is a modern customer management system built with Next.js, featuring a responsive Arabic interface for managing customer relationships. The system allows for tracking sales, payments, and custom interactions through an intuitive form interface.

## Features

- **Arabic RTL Interface**: Fully localized interface with proper right-to-left support
- **Customer Registration**: Add new customers with detailed information
- **Interaction Tracking**: Log different types of customer interactions (sales, payments, custom)
- **Date & Time Management**: Calendar widget with Arabic localization
- **Responsive Design**: Works on both desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **Internationalization**: date-fns with Arabic locale
- **Typography**: Custom Arabic font support (Cairo)

## Getting Started

1. Clone the repository
   ```bash
   git clone git@github.com:Up-to-code/Customer_Management_System.git
   cd customer-management
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to see the application

## Project Structure

```
├── app/
│   ├── actions.ts         # Server actions for data operations
│   ├── fonts.ts           # Font configuration
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/
│   ├── ui/                # shadcn/ui components
│   └── CustomerForm.tsx   # Customer registration form
├── public/
│   ├── dashboard-screenshot.png  # Main screenshot
│   └── favicon.ico        # Site favicon
├── README.md              # This file
└── package.json           # Dependencies and scripts
```

## Customer Form Component

The main `CustomerForm` component allows users to:

- Enter customer name and phone number
- Select interaction type (sale, payment, custom)
- Add detailed notes
- Select date and time with Arabic calendar
- Track customer source/origin

## Deployment

This application can be deployed on Vercel with a simple push to the main branch:

```bash
vercel
```

## Future Improvements

- Customer listing and search functionality
- Reports and analytics dashboard
- Integration with notification systems
- Export functionality (Excel, PDF)
- User authentication and role-based access

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

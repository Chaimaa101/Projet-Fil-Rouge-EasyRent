
# 🚗 EasyRent - Car Rental Management System

<h1 align="center">
	<img
		width="300"
		alt="EasyRent"
		src="frontend_easyrent/public/logo.png">
</h1>

<h3 align="center">
	Complete Car Rental Platform with Real-time Management & Payment Processing
</h3>

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-10-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL">
  <img src="https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe">
</p>

## 📖 Table of Contents

<details>
<summary>Click to expand</summary>

- [🎯 Project Overview](#-project-overview)
- [✨ Key Features](#-key-features)
- [🏗 System Architecture](#-system-architecture)
- [🛠 Tech Stack](#-tech-stack)
- [🚀 Quick Start](#-quick-start)
  - [Prerequisites](#prerequisites)
  - [Backend Setup (Laravel)](#backend-setup-laravel)
  - [Frontend Setup (React)](#frontend-setup-react)
- [📁 Documentation](#-documentation)
  - [Figma](#figma)
  - [Diagram classes](#diagram-classes)
  - [Diagram use case ](#diagram-use-case)
  - [Jira Planification ](#jira)
  - [Cahier de charges ](#cahier-de-charges)
</details>

## 🎯 Project Overview

EasyRent is a modern car rental management system built with Laravel 11 backend and React 18 frontend. The platform features real-time availability tracking, secure payment processing with Stripe, automated invoicing, email notifications, and a comprehensive admin dashboard.

## ✨ Key Features

### **🎯 Core Functionality**
- **Multi-role Authentication** (Admin, Client)
- **Real-time Car Availability Calendar**
- **Dynamic Pricing System** (seasonal, duration-based)
- **Secure Booking & Reservation Management**
- **Review & Rating System with Moderation**

### **💳 Payment & Invoicing**
- **Stripe Payment Gateway Integration**
- **Automated PDF Invoice Generation**
- **Refund & Cancellation Processing**

### **🤖 Automation & Background Jobs**
- **Laravel Queue System** for email notifications
- **Event Listeners** for booking confirmations

### **📱 Frontend Features**
- **Responsive Design** with Tailwind CSS
- **Interactive UI** with React Motion & Framer Motion
- **Image Sliders** with Swiper.js
- **Form Validation** with React Hook Form
- **State Management** with Context API

### **🔧 Admin Dashboard**
- **User & Vehicle Management**
- **Booking Management**




## 🛠 Tech Stack

### **Backend**
- **Laravel 11** - PHP Framework
- **MySQL 8.0** - Database
- **Stripe API** - Payment Processing
- **Dompdf** - PDF Generation
- **Laravel Sanctum** - API Authentication
- **Laravel Queue** - Background Jobs
- **Laravel Events** - Real-time Notifications

### **Frontend**
- **React 19** - UI Library
- **React Router DOM** - Navigation
- **Axios** - HTTP Client
- **React Hook Form** - Form Management
- **React Context API** - State Management
- **Tailwind CSS** - Styling
- **Swiper.js** - Image Sliders
- **Framer Motion** - Animations
- **React Icons** - Icons Library

### **Development & Tools**
- **Docker** - Containerization
- **Postman** - API Testing
- **Composer** - PHP Dependency Manager
- **NPM** - JavaScript Package Manager
- **Git** - Version Control

## 🚀 Quick Start

### **Prerequisites**

Ensure you have the following installed:

```bash
# Check installations
php --version          # PHP >= 8.2
composer --version     # Composer 2.x
node --version         # Node >= 18
npm --version          # NPM >= 9
mysql --version        # MySQL >= 8.0
git --version          # Git
```
### **Backend Setup (Laravel)**

Clone the repository
```bash

git clonehttps://github.com/Chaimaa101/Projet-Fil-Rouge-EasyRent
cd Projet-Fil-Rouge-EasyRent
cd backend_easyent
```

Install PHP dependencies
```bash

composer install

```

Generate application key

```bash
php artisan key:generate
```

Create environment file
```bash
cp .env.example .env
```

Update .env with your database configuration

Database, Mail, Stripe settings
```bash
php artisan migrate
php artisan db:seed

```
R un the server
```bash
php artisan serve

```

### **Frontend Setup (React)**
Navigate to frontend directory
```bash
cd frontend_easyrent
```

Install JavaScript dependencies
```bash
npm install

```
Install additional packages

```bash
npm install axios react-router-dom react-hook-form framer-motion swiper chart.js react-icons
```

runthe environnement

```bash
npm run dev
```

## 📁 Documentation du Projet

### 📄 Cahier des Charges
[![Google Docs](https://img.shields.io/badge/📋_Cahier_des_Charges-View-blue?style=for-the-badge&logo=googledocs)](https://docs.google.com/document/d/1w9TNFzQMC8LWn9QEDfkfngqkBo7OFde5X_3WOdD7Fao/edit?usp=sharing)

### 🗓️ Planification Jira
[![Jira](https://img.shields.io/badge/🗓️_Planification_Jira-View-blue?style=for-the-badge&logo=jira)](https://afkirchaimaa36.atlassian.net/jira/software/c/projects/EPFR/boards/101/backlog?atlOrigin=eyJpIjoiNzY3Yzg2MTY3ZTM5NGVkZTg5MmNhM2ZiNTU4ZGJiMmUiLCJwIjoiaiJ9)

### 📊 Diagrammes de classe
[![Lucidchart](https://img.shields.io/badge/📊_Diagrammes_classe-View-blue?style=for-the-badge&logo=lucidchart)](https://lucid.app/lucidchart/26e0d221-3d5b-48be-b83a-5f42e8ea435d/edit?viewport_loc=-1465%2C-1381%2C4467%2C2291%2C0_0&invitationId=inv_4b753e27-70c2-4ecf-8112-d3be4fb51dc7)

### 📊 Diagrammes de cas d'utilisation
[![Lucidchart](https://img.shields.io/badge/📊_Diagramme_use_case-View-blue?style=for-the-badge&logo=lucidchart)](https://lucid.app/lucidchart/47e2a05e-8cfc-4c5e-a0ad-8d2fd46e0a79/edit?view_items=R-4._viS7Oe5&page=.Q4MUjXso07N&invitationId=inv_aedabdaa-81be-48b7-8532-a3773f0123b1)

### 🖼️ Figma Design
[![Figma](https://img.shields.io/badge/🎨_Maquettes_Figma-View-blue?style=for-the-badge&logo=figma)](https://www.figma.com/design/Ccjn2w0FwamP4CDS5EyC04/FillRouge-EasyRent?t=ZUUNBqNUfE3AwodG-1)



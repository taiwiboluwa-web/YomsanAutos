import { useState, useMemo, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, MapPin, Clock, Phone, ChevronRight, MessageCircle, Filter, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SmartCursor } from "./components/SmartCursor";
import yomsanAuto2 from "../imports/yomsan_auto__2_-1.png";
import yomsanAuto3 from "../imports/yomsan_auto__3_-1.png";

const WHATSAPP_NUMBER = "+2348033090335";
const POPPINS = "'Poppins', sans-serif";
const PLAYFAIR = "'Playfair Display', serif";

// New Color Palette
const BLUE = "#0E2F76"; // Deep Navy Blue
const BLUE_DARK = "#0a2355"; // Darker Navy
const BLUE_LIGHT = "#A9C0E0"; // Soft Blue
const ACCENT_LIGHT = "#F4FEFF"; // Very Light Blue/Cyan

// ─── Data ─────────────────────────────────────────────────────────────────────

const vehicles = [
  {
    id: 1,
    brand: "BMW",
    model: "M5 Competition",
    year: 2023,
    color: "Obsidian Black",
    price: 115000,
    type: "Sedan",
    status: "Available",
    mileage: 8200,
    engine: "4.4L V8 Biturbo",
    hp: 625,
    image: "https://images.unsplash.com/photo-1603189617530-6d32306f57c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCTVclMjBNNSUyMENvbXBldGl0aW9uJTIwYmxhY2slMjBsdXh1cnklMjBzZWRhbnxlbnwxfHx8fDE3ODA2NDQyNDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    brand: "Porsche",
    model: "Cayenne GTS",
    year: 2022,
    color: "Chalk White",
    price: 98000,
    type: "SUV",
    status: "Available",
    mileage: 14500,
    engine: "4.0L V8 Twin-Turbo",
    hp: 453,
    image: "https://images.unsplash.com/photo-1684258401949-293a5d330340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxQb3JzY2hlJTIwQ2F5ZW5uZSUyMHdoaXRlJTIwbHV4dXJ5JTIwU1VWfGVufDF8fHx8MTc4MDY0NDI0MXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    brand: "Mercedes",
    model: "AMG GT 63 S",
    year: 2023,
    color: "Iridium Silver",
    price: 158000,
    type: "Coupe",
    status: "Reserved",
    mileage: 3100,
    engine: "4.0L V8 Biturbo",
    hp: 630,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNZXJjZWRlcyUyMEFNRyUyMEdUJTIwc2lsdmVyJTIwY291cGV8ZW58MXx8fHwxNzgwNjQ0MjQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    brand: "Mercedes",
    model: "C300 AMG Line",
    year: 2023,
    color: "Polar White",
    price: 48500,
    type: "Sedan",
    status: "Available",
    mileage: 12300,
    engine: "2.0L Turbo I4",
    hp: 255,
    image: "https://images.unsplash.com/photo-1605556816125-d752c226247b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxNZXJjZWRlcyUyMEMzMDAlMjB3aGl0ZSUyMHNlZGFufGVufDF8fHx8MTc4MDY0NDI0Mnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 5,
    brand: "Lexus",
    model: "ES 350 F Sport",
    year: 2023,
    color: "Sonic Titanium",
    price: 52000,
    type: "Sedan",
    status: "Available",
    mileage: 9800,
    engine: "3.5L V6",
    hp: 302,
    image: "https://images.unsplash.com/photo-1702757329688-073f16ff8893?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxMZXh1cyUyMEVTJTIwMzUwJTIwbHV4dXJ5JTIwc2VkYW58ZW58MXx8fHwxNzgwNjQ0MjQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 6,
    brand: "Toyota",
    model: "Camry XSE",
    year: 2024,
    color: "Wind Chill Pearl",
    price: 32500,
    type: "Sedan",
    status: "Available",
    mileage: 5200,
    engine: "2.5L I4",
    hp: 203,
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxUb3lvdGElMjBDYW1yeSUyMHdoaXRlJTIwc2VkYW58ZW58MXx8fHwxNzgwNjQ0MjQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 7,
    brand: "Lexus",
    model: "RX 350 F Sport",
    year: 2023,
    color: "Atomic Silver",
    price: 58000,
    type: "SUV",
    status: "Available",
    mileage: 11400,
    engine: "3.5L V6",
    hp: 295,
    image: "https://images.unsplash.com/photo-1707960189687-18a84ca15bae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxMZXh1cyUyMFJYJTIwMzUwJTIwc2lsdmVyJTIwU1VWfGVufDF8fHx8MTc4MDY0NDI0M3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 8,
    brand: "Mercedes",
    model: "GLE 450 4MATIC",
    year: 2023,
    color: "Obsidian Black",
    price: 82000,
    type: "SUV",
    status: "Available",
    mileage: 8900,
    engine: "3.0L I6 Turbo",
    hp: 362,
    image: "https://images.unsplash.com/photo-1732347700493-44e8e1e79c9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNZXJjZWRlcyUyMEdMRSUyMGJsYWNrJTIwbHV4dXJ5JTIwU1VWfGVufDF8fHx8MTc4MDY0NDI0NHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 9,
    brand: "Range Rover",
    model: "Sport HSE",
    year: 2023,
    color: "Santorini Black",
    price: 95000,
    type: "SUV",
    status: "Reserved",
    mileage: 6700,
    engine: "3.0L I6 Supercharged",
    hp: 355,
    image: "https://images.unsplash.com/photo-1677228447083-3245a27daf91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSYW5nZSUyMFJvdmVyJTIwU3BvcnQlMjBibGFjayUyMFNVVnxlbnwxfHx8fDE3ODA2NDQyNDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 10,
    brand: "Toyota",
    model: "Land Cruiser Prado",
    year: 2023,
    color: "Attitude Black",
    price: 68000,
    type: "SUV",
    status: "Available",
    mileage: 15200,
    engine: "2.8L Turbo Diesel",
    hp: 201,
    image: "https://images.unsplash.com/photo-1654688554491-69d21d38fb91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxUb3lvdGElMjBMYW5kJTIwQ3J1aXNlciUyMFByYWRvJTIwU1VWfGVufDF8fHx8MTc4MDY0NDI0NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 11,
    brand: "Mercedes",
    model: "AMG G63",
    year: 2023,
    color: "Designo Diamond White",
    price: 185000,
    type: "SUV",
    status: "Available",
    mileage: 3400,
    engine: "4.0L V8 Biturbo",
    hp: 577,
    image: "https://images.unsplash.com/photo-1669234226129-8ede05b40eff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxNZXJjZWRlcyUyMEctV2Fnb24lMjB3aGl0ZSUyMGx1eHVyeSUyMFNVVnxlbnwxfHx8fDE3ODA2NDQyNDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 12,
    brand: "Toyota",
    model: "Highlander Limited",
    year: 2023,
    color: "Celestial Silver",
    price: 45000,
    type: "SUV",
    status: "Available",
    mileage: 18900,
    engine: "3.5L V6",
    hp: 295,
    image: "https://images.unsplash.com/photo-1617600346256-af3cd5b16a4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxUb3lvdGElMjBIaWdobGFuZGVyJTIwc2lsdmVyJTIwU1VWfGVufDF8fHx8MTc4MDY0NDI0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 13,
    brand: "Lexus",
    model: "NX 300 Luxury",
    year: 2022,
    color: "Sonic Quartz",
    price: 42000,
    type: "SUV",
    status: "Available",
    mileage: 21500,
    engine: "2.0L Turbo I4",
    hp: 235,
    image: "https://images.unsplash.com/photo-1662944282088-c18952b39550?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxMZXh1cyUyMFJYJTIwMzUwJTIwc2lsdmVyJTIwU1VWfGVufDF8fHx8MTc4MDY0NDI0M3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 14,
    brand: "Honda",
    model: "Pilot Elite",
    year: 2023,
    color: "Modern Steel",
    price: 48500,
    type: "SUV",
    status: "Available",
    mileage: 16700,
    engine: "3.5L V6",
    hp: 280,
    image: "https://images.unsplash.com/photo-1708148246994-b7b3c818090d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIb25kYSUyMFBpbG90JTIwZmFtaWx5JTIwU1VWfGVufDF8fHx8MTc4MDY0NDI0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 15,
    brand: "Toyota",
    model: "Hilux Revo Rogue",
    year: 2023,
    color: "Attitude Black",
    price: 38000,
    type: "Truck",
    status: "Available",
    mileage: 24300,
    engine: "2.8L Turbo Diesel",
    hp: 201,
    image: "https://images.unsplash.com/photo-1657901381268-e19ce82ad260?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb3lvdGElMjBIaWx1eCUyMGJsYWNrJTIwcGlja3VwJTIwdHJ1Y2t8ZW58MXx8fHwxNzgwNjQ0MjQ3fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 16,
    brand: "Ford",
    model: "F-150 Raptor",
    year: 2023,
    color: "Code Orange",
    price: 78000,
    type: "Truck",
    status: "Reserved",
    mileage: 8900,
    engine: "3.5L EcoBoost V6",
    hp: 450,
    image: "https://images.unsplash.com/photo-1641974785913-63645632afe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxGb3JkJTIwRi0xNTAlMjBSYXB0b3IlMjBvcmFuZ2UlMjB0cnVja3xlbnwxfHx8fDE3ODA2NDQyNDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 17,
    brand: "Lexus",
    model: "LX 570",
    year: 2022,
    color: "Starlight Black",
    price: 92000,
    type: "SUV",
    status: "Available",
    mileage: 19200,
    engine: "5.7L V8",
    hp: 383,
    image: "https://images.unsplash.com/photo-1700884520248-92092bd21e63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMZXh1cyUyMExYJTIwNTcwJTIwYmxhY2slMjBsdXh1cnklMjBTVVZ8ZW58MXx8fHwxNzgwNjQ0MjQ3fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 18,
    brand: "Mercedes",
    model: "E350 AMG Line",
    year: 2023,
    color: "Selenite Grey",
    price: 68000,
    type: "Sedan",
    status: "Available",
    mileage: 7100,
    engine: "2.0L Turbo I4",
    hp: 255,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNZXJjZWRlcyUyMEFNRyUyMEdUJTIwc2lsdmVyJTIwY291cGV8ZW58MXx8fHwxNzgwNjQ0MjQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 19,
    brand: "Honda",
    model: "Accord Sport",
    year: 2024,
    color: "Platinum White",
    price: 29500,
    type: "Sedan",
    status: "Available",
    mileage: 4200,
    engine: "1.5L Turbo I4",
    hp: 192,
    image: "https://images.unsplash.com/photo-1631547891859-184677884115?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIb25kYSUyMEFjY29yZCUyMHdoaXRlJTIwc2VkYW58ZW58MXx8fHwxNzgwNjQ0MjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 20,
    brand: "Range Rover",
    model: "Velar P250 R-Dynamic",
    year: 2023,
    color: "Firenze Red",
    price: 72000,
    type: "SUV",
    status: "Available",
    mileage: 10800,
    engine: "2.0L Turbo I4",
    hp: 247,
    image: "https://images.unsplash.com/photo-1738432553451-029d47c6d413?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxSYW5nZSUyMFJvdmVyJTIwVmVsYXIlMjByZWQlMjBsdXh1cnklMjBTVVZ8ZW58MXx8fHwxNzgwNjQ0MjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 21,
    brand: "Toyota",
    model: "Sienna Limited",
    year: 2023,
    color: "Celestial Silver",
    price: 42000,
    type: "Van",
    status: "Available",
    mileage: 13500,
    engine: "2.5L Hybrid I4",
    hp: 245,
    image: "https://images.unsplash.com/photo-1617600346256-af3cd5b16a4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxUb3lvdGElMjBIaWdobGFuZGVyJTIwc2lsdmVyJTIwU1VWfGVufDF8fHx8MTc4MDY0NDI0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 22,
    brand: "Lexus",
    model: "IS 350 F Sport",
    year: 2023,
    color: "Ultrasonic Blue",
    price: 48000,
    type: "Sedan",
    status: "Sold",
    mileage: 6800,
    engine: "3.5L V6",
    hp: 311,
    image: "https://images.unsplash.com/photo-1664427321044-b4057f77777e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxMZXh1cyUyMEVTJTIwMzUwJTIwbHV4dXJ5JTIwc2VkYW58ZW58MXx8fHwxNzgwNjQ0MjQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 23,
    brand: "Mercedes",
    model: "GLS 450 4MATIC",
    year: 2023,
    color: "Polar White",
    price: 98000,
    type: "SUV",
    status: "Available",
    mileage: 9400,
    engine: "3.0L I6 Turbo",
    hp: 362,
    image: "https://images.unsplash.com/photo-1669234226129-8ede05b40eff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNZXJjZWRlcyUyMEdMUyUyMHdoaXRlJTIwbHV4dXJ5JTIwU1VWfGVufDF8fHx8MTc4MDY0NDI0OXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 24,
    brand: "Toyota",
    model: "Land Cruiser LC300",
    year: 2024,
    color: "Attitude Black",
    price: 88000,
    type: "SUV",
    status: "Reserved",
    mileage: 2800,
    engine: "3.5L Twin-Turbo V6",
    hp: 409,
    image: "https://images.unsplash.com/photo-1654688554491-69d21d38fb91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxUb3lvdGElMjBMYW5kJTIwQ3J1aXNlciUyMFByYWRvJTIwU1VWfGVufDF8fHx8MTc4MDY0NDI0NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 25,
    brand: "Range Rover",
    model: "Autobiography LWB",
    year: 2023,
    color: "Byron Blue",
    price: 145000,
    type: "SUV",
    status: "Available",
    mileage: 4500,
    engine: "5.0L Supercharged V8",
    hp: 518,
    image: "https://images.unsplash.com/photo-1604054094723-3a949e4a8993?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxSYW5nZSUyMFJvdmVyJTIwU3BvcnQlMjBibGFjayUyMFNVVnxlbnwxfHx8fDE3ODA2NDQyNDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 26,
    brand: "Audi",
    model: "RS7 Sportback",
    year: 2023,
    color: "Navarra Blue",
    price: 128000,
    type: "Sedan",
    status: "Available",
    mileage: 7500,
    engine: "4.0L V8 TFSI",
    hp: 591,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
  },
  {
    id: 27,
    brand: "Porsche",
    model: "911 Carrera S",
    year: 2023,
    color: "GT Silver",
    price: 138000,
    type: "Coupe",
    status: "Available",
    mileage: 5200,
    engine: "3.0L Twin-Turbo Flat-6",
    hp: 443,
    image: "https://images.unsplash.com/photo-1611821064430-beff4a725050?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
  },
  {
    id: 28,
    brand: "BMW",
    model: "X7 M60i",
    year: 2024,
    color: "Carbon Black",
    price: 118000,
    type: "SUV",
    status: "Available",
    mileage: 3800,
    engine: "4.4L V8 Twin-Turbo",
    hp: 523,
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
  },
  {
    id: 29,
    brand: "Maserati",
    model: "Levante Trofeo",
    year: 2023,
    color: "Blu Emozione",
    price: 155000,
    type: "SUV",
    status: "Reserved",
    mileage: 6100,
    engine: "3.8L V8 Twin-Turbo",
    hp: 580,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
  },
  {
    id: 30,
    brand: "Bentley",
    model: "Bentayga V8",
    year: 2023,
    color: "Glacier White",
    price: 215000,
    type: "SUV",
    status: "Available",
    mileage: 4200,
    engine: "4.0L V8 Twin-Turbo",
    hp: 542,
    image: "https://images.unsplash.com/photo-1563721911289-ada2924d66f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
  },
  {
    id: 31,
    brand: "Aston Martin",
    model: "DBX707",
    year: 2024,
    color: "Onyx Black",
    price: 242000,
    type: "SUV",
    status: "Available",
    mileage: 2100,
    engine: "4.0L V8 Twin-Turbo",
    hp: 697,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
  },
  {
    id: 32,
    brand: "Lamborghini",
    model: "Urus Performante",
    year: 2024,
    color: "Arancio Borealis",
    price: 268000,
    type: "SUV",
    status: "Available",
    mileage: 1800,
    engine: "4.0L V8 Twin-Turbo",
    hp: 666,
    image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
  },
  {
    id: 33,
    brand: "Rolls-Royce",
    model: "Cullinan Black Badge",
    year: 2023,
    color: "Black Diamond",
    price: 385000,
    type: "SUV",
    status: "Reserved",
    mileage: 3500,
    engine: "6.75L V12 Twin-Turbo",
    hp: 600,
    image: "https://images.unsplash.com/photo-1563721911289-ada2924d66f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
  },
  {
    id: 34,
    brand: "Ferrari",
    model: "Purosangue",
    year: 2024,
    color: "Rosso Corsa",
    price: 425000,
    type: "SUV",
    status: "Available",
    mileage: 950,
    engine: "6.5L V12",
    hp: 715,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
  },
  {
    id: 35,
    brand: "McLaren",
    model: "GT",
    year: 2023,
    color: "Azores Orange",
    price: 238000,
    type: "Coupe",
    status: "Available",
    mileage: 4100,
    engine: "4.0L V8 Twin-Turbo",
    hp: 612,
    image: "https://images.unsplash.com/photo-1619732528284-9307c5256291?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
  },
];

const TICKER_ITEMS = [
  { dot: "green", text: "BMW M5 Competition — Just Arrived · Pristine Condition" },
  { dot: "red", text: "Mercedes S580 Maybach — NOW SOLD · Thank You" },
  { dot: "yellow", text: "Porsche Cayenne GTS — Inspection Slots Open This Week" },
  { dot: "green", text: "New Shipment Incoming · 3 Premium Units Expected" },
  { dot: "green", text: "Audi RS7 Sportback — Price Reduced · Contact Us Today" },
];

const BRANDS = ["All", "Aston Martin", "Audi", "Bentley", "BMW", "Ferrari", "Ford", "Honda", "Lamborghini", "Lexus", "Maserati", "McLaren", "Mercedes", "Porsche", "Range Rover", "Rolls-Royce", "Toyota"];
const TYPES = ["All", "Sedan", "SUV", "Coupe", "Convertible", "Truck", "Van"];
const STATUSES = ["All", "Available", "Reserved"];

type Vehicle = (typeof vehicles)[0];
type FilterState = { brand: string; type: string; status: string };

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(price: number) {
  return `$${price.toLocaleString("en-US")}`;
}

function formatMileage(km: number) {
  return `${km.toLocaleString()} km`;
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const cfg: Record<string, { bg: string; text: string; dot: string; pulse: boolean }> = {
    Available: { bg: "bg-emerald-500/15 dark:bg-emerald-500/25", text: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500 dark:bg-emerald-400", pulse: true },
    Reserved: { bg: "bg-amber-500/15 dark:bg-amber-500/25", text: "text-amber-600 dark:text-amber-400", dot: "bg-amber-500 dark:bg-amber-400", pulse: false },
    Sold: { bg: "bg-red-500/15 dark:bg-red-500/25", text: "text-red-600 dark:text-red-400", dot: "bg-red-500 dark:bg-red-400", pulse: false },
  };
  const c = cfg[status] ?? cfg["Sold"];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-semibold tracking-[0.12em] uppercase ${c.bg} ${c.text}`}
      style={{ fontFamily: POPPINS }}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} ${c.pulse ? "animate-pulse" : ""}`} />
      {status}
    </span>
  );
}

// ─── Vehicle Card ─────────────────────────────────────────────────────────────

function VehicleCard({ vehicle, onBook }: { vehicle: Vehicle; onBook: (v: Vehicle) => void }) {
  const canBook = vehicle.status === "Available";

  return (
    <div
      className="luxury-card glass-card group relative flex flex-col overflow-hidden rounded-2xl shadow-xl dark:shadow-2xl hover:shadow-2xl"
      style={{
        cursor: canBook ? "pointer" : "default",
      }}
      data-cursor-text={canBook ? "View" : ""}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#f1f5f9]">
        <img
          src={vehicle.image}
          alt={`${vehicle.year} ${vehicle.brand} ${vehicle.model}`}
          loading="lazy"
          className="w-full h-full object-cover"
          style={{ transition: "transform 400ms ease-out" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent opacity-70 pointer-events-none" />
        <div className="absolute top-3 right-3 pointer-events-none">
          <StatusBadge status={vehicle.status} />
        </div>
        <div
          className="absolute bottom-3 left-3 text-[10px] text-[#64748b] font-semibold tracking-[0.2em] uppercase pointer-events-none"
          style={{ fontFamily: POPPINS }}
        >
          {vehicle.year}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Brand + Model */}
        <div>
          <div
            className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-1 text-[#0E2F76] dark:text-[#A9C0E0]"
            style={{ fontFamily: POPPINS }}
          >
            {vehicle.brand}
          </div>
          <h3
            className="text-[1.1rem] font-bold leading-tight text-[#0f172a] dark:text-[#f8fafc]"
            style={{ fontFamily: PLAYFAIR }}
          >
            {vehicle.model}
          </h3>
        </div>

        {/* Specs row */}
        <div className="grid grid-cols-3 gap-2 border-t border-[#e2e8f0] dark:border-[#1e293b] pt-4">
          {[
            { label: "Engine", value: vehicle.engine },
            { label: "Power", value: `${vehicle.hp} HP` },
            { label: "Mileage", value: formatMileage(vehicle.mileage) },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-0.5">
              <span
                className="text-[9px] text-[#64748b] dark:text-[#94a3b8] uppercase tracking-[0.15em]"
                style={{ fontFamily: POPPINS }}
              >
                {s.label}
              </span>
              <span className="text-[11px] text-[#475569] dark:text-[#cbd5e1] font-medium" style={{ fontFamily: POPPINS }}>
                {s.value}
              </span>
            </div>
          ))}
        </div>

        {/* Color + Price */}
        <div className="flex items-end justify-between mt-auto">
          <div className="flex flex-col gap-0.5">
            <span
              className="text-[9px] text-[#64748b] dark:text-[#94a3b8] uppercase tracking-[0.15em]"
              style={{ fontFamily: POPPINS }}
            >
              Colour
            </span>
            <span className="text-[11px] text-[#475569] dark:text-[#cbd5e1]" style={{ fontFamily: POPPINS }}>
              {vehicle.color}
            </span>
          </div>
          <div
            className="text-[1.15rem] font-black text-[#0f172a] dark:text-[#f8fafc] text-right"
            style={{ fontFamily: POPPINS }}
          >
            {formatPrice(vehicle.price)}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => canBook && onBook(vehicle)}
          disabled={!canBook}
          className={`w-full py-3 text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 rounded-full ${
            canBook
              ? "text-white active:scale-[0.95] hover:shadow-xl hover:shadow-[#A9C0E0]/30"
              : "bg-[#f1f5f9] dark:bg-[#1e293b] text-[#94a3b8] dark:text-[#64748b] cursor-not-allowed"
          }`}
          style={
            canBook
              ? {
                  fontFamily: POPPINS,
                  backgroundColor: BLUE,
                }
              : { fontFamily: POPPINS }
          }
          data-cursor-text={canBook ? "Book" : ""}
        >
          {canBook ? "Book Inspection" : vehicle.status === "Reserved" ? "Currently Reserved" : "Sold"}
        </button>
      </div>
    </div>
  );
}

// ─── Filter Sidebar ───────────────────────────────────────────────────────────

function FilterSidebar({
  filters,
  onChange,
  counts,
}: {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  counts: { total: number; available: number };
}) {
  const hasFilters = filters.brand !== "All" || filters.type !== "All" || filters.status !== "All";

  const Chip = ({
    label,
    active,
    onClick,
  }: {
    label: string;
    active: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-[11px] font-medium tracking-wide border transition-all duration-150 ${
        active
          ? "text-white dark:text-[#f8fafc]"
          : "border-[#e2e8f0] dark:border-[#1e293b] text-[#64748b] dark:text-[#94a3b8] hover:border-[#3a3a3a] dark:hover:border-[#475569] hover:text-[#475569] dark:hover:text-[#cbd5e1]"
      }`}
      style={
        active
          ? { fontFamily: POPPINS, borderColor: BLUE, backgroundColor: `${BLUE}1a` }
          : { fontFamily: POPPINS }
      }
    >
      {label}
    </button>
  );

  const FilterGroup = ({
    label,
    options,
    field,
  }: {
    label: string;
    options: string[];
    field: keyof FilterState;
  }) => (
    <div className="flex flex-col gap-2.5">
      <div
        className="text-[9px] text-[#64748b] dark:text-[#94a3b8] uppercase tracking-[0.2em] font-semibold"
        style={{ fontFamily: POPPINS }}
      >
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <Chip
            key={opt}
            label={opt}
            active={filters[field] === opt}
            onClick={() => onChange({ ...filters, [field]: opt })}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="liquid-glass-strong p-5 flex flex-col gap-6 rounded-2xl shadow-xl dark:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <div
            className="text-[11px] font-bold text-[#0f172a] dark:text-[#f8fafc] tracking-wide mb-0.5"
            style={{ fontFamily: POPPINS }}
          >
            Filter
          </div>
          <div className="text-[10px] text-[#64748b] dark:text-[#94a3b8]" style={{ fontFamily: POPPINS }}>
            {counts.available} available · {counts.total} total
          </div>
        </div>
        {hasFilters && (
          <button
            onClick={() => onChange({ brand: "All", type: "All", status: "All" })}
            className="text-[9px] uppercase tracking-[0.15em] transition-colors"
            style={{ fontFamily: POPPINS, color: BLUE }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = BLUE_LIGHT)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = BLUE)
            }
          >
            Clear
          </button>
        )}
      </div>

      <div className="w-full h-px bg-[#1a1a1a]" />
      <FilterGroup label="Brand" options={BRANDS} field="brand" />
      <FilterGroup label="Body Type" options={TYPES} field="type" />
      <FilterGroup label="Availability" options={STATUSES} field="status" />
    </div>
  );
}

// ─── Hero Section with Image Carousel ────────────────────────────────────────

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1763165561886-a9391b2132c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
  "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
  "https://images.unsplash.com/photo-1603189617530-6d32306f57c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
  "https://images.unsplash.com/photo-1605556816125-d752c226247b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
];

function HeroSection({ counts }: { counts: { total: number; available: number } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative grid md:grid-cols-[3fr_2fr] min-h-[320px] rounded-2xl overflow-hidden shadow-2xl liquid-glass-strong transition-all duration-500 hover:shadow-[#A9C0E0]/30 dark:hover:shadow-[#A9C0E0]/20">
      {/* Left — Hero Image Carousel */}
      <div className="relative overflow-hidden bg-[#f8f9fa] min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={HERO_IMAGES[currentImageIndex]}
            alt="Yomsan Motors Showroom"
            className="w-full h-full object-cover absolute inset-0"
            style={{ minHeight: "220px" }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0a0a0a] opacity-80 pointer-events-none hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 via-transparent to-transparent pointer-events-none" />

        {/* Image indicators */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImageIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === currentImageIndex ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`View image ${i + 1}`}
            />
          ))}
        </div>

        {/* Location info overlay */}
        <div className="absolute bottom-3 left-3 z-10">
          <div
            className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] mb-1"
            style={{ fontFamily: POPPINS, color: BLUE }}
          >
            <MapPin size={8} />
            Lagos, Nigeria
          </div>
          <div className="flex items-center gap-3">
            <span
              className="flex items-center gap-1.5 text-[9px] text-[#64748b]"
              style={{ fontFamily: POPPINS }}
            >
              <Clock size={8} />
              Mon–Sat 9am–7pm
            </span>
            <span
              className="flex items-center gap-1.5 text-[9px] text-[#64748b]"
              style={{ fontFamily: POPPINS }}
            >
              <Phone size={8} />
              +234 803 309 0335
            </span>
          </div>
        </div>
      </div>

      {/* Right — Content */}
      <div className="flex flex-col justify-center gap-5 p-6 md:p-8 border-t md:border-t-0 md:border-l border-[#e2e8f0]">
        <div>
          <div
            className="text-[8px] uppercase tracking-[0.35em] font-semibold mb-3 text-[#0E2F76] dark:text-[#A9C0E0]"
            style={{ fontFamily: POPPINS }}
          >
            Premier Luxury Dealership
          </div>
          <h1
            className="text-[2.2rem] font-black text-[#0f172a] dark:text-[#f8fafc] leading-[1.08] mb-3"
            style={{ fontFamily: POPPINS }}
          >
            Drive the
            <br />
            <em
              className="not-italic text-[#0E2F76] dark:text-[#A9C0E0]"
              style={{ fontFamily: PLAYFAIR, fontStyle: "italic" }}
            >
              Extraordinary
            </em>
          </h1>
          <p
            className="text-[#64748b] dark:text-[#94a3b8] text-[12px] leading-relaxed"
            style={{ fontFamily: POPPINS, maxWidth: "26ch" }}
          >
            A curated collection of premium pre-owned vehicles. Every car rigorously certified before entering our showroom.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#e2e8f0] dark:border-[#1e293b]">
          {[
            { val: counts.available.toString(), label: "Available" },
            { val: "100%", label: "Inspected" },
            { val: "10+", label: "Yrs Trusted" },
          ].map((s) => (
            <div key={s.label}>
              <div
                className="text-xl font-black text-[#0f172a] dark:text-[#f8fafc] mb-0.5"
                style={{ fontFamily: POPPINS }}
              >
                {s.val}
              </div>
              <div
                className="text-[8px] text-[#64748b] dark:text-[#94a3b8] uppercase tracking-[0.15em]"
                style={{ fontFamily: POPPINS }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-2">
          <a
            href="#inventory"
            className="flex items-center justify-center gap-2 text-white py-3 text-[10px] font-black tracking-[0.18em] uppercase active:scale-[0.95] transition-all duration-300 rounded-full liquid-glass shadow-lg hover:shadow-xl hover:shadow-[#A9C0E0]/40"
            style={{ fontFamily: POPPINS, backgroundColor: BLUE }}
            data-cursor-text="Explore"
          >
            Browse Inventory
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronRight size={12} />
            </motion.div>
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              "Hi Yomsan Motors! I'm interested in booking a showroom visit."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 glass-card text-[#64748b] dark:text-[#94a3b8] py-3 text-[10px] font-semibold tracking-[0.12em] uppercase hover:text-[#0E2F76] dark:hover:text-[#A9C0E0] transition-all duration-300 rounded-full"
            style={{ fontFamily: POPPINS }}
          >
            <MessageCircle size={11} />
            Contact Showroom
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Booking Modal ────────────────────────────────────────────────────────────

function BookingModal({
  vehicle,
  onClose,
}: {
  vehicle: Vehicle | null;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ name: "", phone: "", date: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hi Yomsan Motors!\n\nI would like to book an inspection.\n\n🚗 Vehicle: ${vehicle?.year} ${vehicle?.brand} ${vehicle?.model}\n👤 Name: ${form.name}\n📞 Phone: ${form.phone}\n📅 Preferred Date: ${form.date}${form.notes ? `\n📝 Notes: ${form.notes}` : ""}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  const handleClose = () => {
    setForm({ name: "", phone: "", date: "", notes: "" });
    setSubmitted(false);
    onClose();
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Dialog.Root open={!!vehicle} onOpenChange={(open) => !open && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 bg-black/50 z-50"
          style={{ backdropFilter: "blur(6px)" }}
        />
        <Dialog.Content
          className="fixed bottom-0 left-0 right-0 z-50 liquid-glass-strong max-w-xl mx-auto shadow-2xl shadow-[#A9C0E0]/30 dark:shadow-[#0E2F76]/50 rounded-t-3xl transition-all duration-500"
          style={{ animation: "slideUp 320ms cubic-bezier(0.23, 1, 0.32, 1)" }}
          aria-describedby={undefined}
        >
          <div className="px-6 py-7 md:px-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div
                  className="text-[9px] uppercase tracking-[0.25em] mb-1.5 font-semibold"
                  style={{ fontFamily: POPPINS, color: BLUE }}
                >
                  Schedule Inspection
                </div>
                <Dialog.Title
                  className="text-xl font-bold text-[#0f172a] leading-tight"
                  style={{ fontFamily: PLAYFAIR }}
                >
                  {vehicle?.year} {vehicle?.brand} {vehicle?.model}
                </Dialog.Title>
              </div>
              <Dialog.Close asChild>
                <button className="text-[#64748b] hover:text-[#0f172a] transition-colors mt-0.5 p-1 -mr-1">
                  <X size={16} />
                </button>
              </Dialog.Close>
            </div>

            {/* Rule */}
            <div
              className="h-px mb-6 bg-gradient-to-r from-[#A9C0E0]/60 via-[#A9C0E0]/20 to-transparent"
            />

            {submitted ? (
              <div className="py-10 text-center flex flex-col items-center gap-4">
                <div
                  className="w-12 h-12 flex items-center justify-center text-[#0f172a] text-lg border"
                  style={{ borderColor: BLUE, color: BLUE }}
                >
                  ✓
                </div>
                <div>
                  <p className="text-[#0f172a] font-semibold mb-1" style={{ fontFamily: POPPINS }}>
                    WhatsApp Opened
                  </p>
                  <p className="text-[#64748b] text-sm" style={{ fontFamily: POPPINS }}>
                    Our team will confirm your slot shortly.
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="mt-2 px-6 py-2.5 text-white text-[11px] font-bold uppercase tracking-[0.15em] active:scale-[0.97] transition-all duration-300 rounded-full liquid-glass shadow-lg hover:shadow-xl"
                  style={{ fontFamily: POPPINS, backgroundColor: BLUE }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.backgroundColor = BLUE_DARK)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.backgroundColor = BLUE)
                  }
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-[9px] text-[#64748b] uppercase tracking-[0.15em]"
                      style={{ fontFamily: POPPINS }}
                    >
                      Full Name
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Ahmad Razif"
                      className="liquid-glass text-[#0f172a] dark:text-[#f8fafc] text-sm px-3 py-2.5 placeholder:text-[#94a3b8] transition-all duration-300 focus:outline-none rounded-lg focus:shadow-lg focus:shadow-[#A9C0E0]/20"
                      style={{ fontFamily: POPPINS }}
                      onFocus={(e) =>
                        ((e.currentTarget as HTMLInputElement).style.borderColor = BLUE)
                      }
                      onBlur={(e) =>
                        ((e.currentTarget as HTMLInputElement).style.borderColor = "#2a2a2a")
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-[9px] text-[#64748b] uppercase tracking-[0.15em]"
                      style={{ fontFamily: POPPINS }}
                    >
                      Phone Number
                    </label>
                    <input
                      required
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="+234 803 309 0335"
                      className="liquid-glass text-[#0f172a] dark:text-[#f8fafc] text-sm px-3 py-2.5 placeholder:text-[#94a3b8] transition-all duration-300 focus:outline-none rounded-lg focus:shadow-lg focus:shadow-[#A9C0E0]/20"
                      style={{ fontFamily: POPPINS }}
                      onFocus={(e) =>
                        ((e.currentTarget as HTMLInputElement).style.borderColor = BLUE)
                      }
                      onBlur={(e) =>
                        ((e.currentTarget as HTMLInputElement).style.borderColor = "#2a2a2a")
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-[9px] text-[#64748b] uppercase tracking-[0.15em]"
                    style={{ fontFamily: POPPINS }}
                  >
                    Preferred Inspection Date
                  </label>
                  <input
                    required
                    type="date"
                    value={form.date}
                    min={today}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                    className="liquid-glass text-[#0f172a] dark:text-[#f8fafc] text-sm px-3 py-2.5 transition-all duration-300 focus:outline-none rounded-lg focus:shadow-lg focus:shadow-[#A9C0E0]/20 [color-scheme:light] dark:[color-scheme:dark]"
                    style={{ fontFamily: POPPINS }}
                    onFocus={(e) =>
                      ((e.currentTarget as HTMLInputElement).style.borderColor = BLUE)
                    }
                    onBlur={(e) =>
                      ((e.currentTarget as HTMLInputElement).style.borderColor = "#2a2a2a")
                    }
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-[9px] text-[#64748b] uppercase tracking-[0.15em]"
                    style={{ fontFamily: POPPINS }}
                  >
                    Additional Notes{" "}
                    <span className="text-[#64748b] dark:text-[#94a3b8] normal-case tracking-normal">(optional)</span>
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                    placeholder="Any specific requests or questions..."
                    rows={2}
                    className="liquid-glass text-[#0f172a] dark:text-[#f8fafc] text-sm px-3 py-2.5 placeholder:text-[#94a3b8] transition-all duration-300 resize-none focus:outline-none rounded-lg focus:shadow-lg focus:shadow-[#A9C0E0]/20"
                    style={{ fontFamily: POPPINS }}
                    onFocus={(e) =>
                      ((e.currentTarget as HTMLTextAreaElement).style.borderColor = BLUE)
                    }
                    onBlur={(e) =>
                      ((e.currentTarget as HTMLTextAreaElement).style.borderColor = "#2a2a2a")
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="mt-1 w-full py-3.5 text-white text-[11px] font-black tracking-[0.2em] uppercase flex items-center justify-center gap-2 active:scale-[0.98] transition-all duration-300 rounded-full liquid-glass shadow-xl hover:shadow-2xl"
                  style={{ fontFamily: POPPINS, backgroundColor: BLUE }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.backgroundColor = BLUE_DARK)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.backgroundColor = BLUE)
                  }
                >
                  <MessageCircle size={14} />
                  Continue via WhatsApp
                </button>
              </form>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [filters, setFilters] = useState<FilterState>({ brand: "All", type: "All", status: "All" });
  const [bookingVehicle, setBookingVehicle] = useState<Vehicle | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      if (filters.brand !== "All" && v.brand !== filters.brand) return false;
      if (filters.type !== "All" && v.type !== filters.type) return false;
      if (filters.status !== "All" && v.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  const counts = {
    total: vehicles.length,
    available: vehicles.filter((v) => v.status === "Available").length,
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#F4FEFF] via-white to-[#F4FEFF] dark:from-[#0b0f19] dark:via-[#0a1628] dark:to-[#0b0f19] text-[#0f172a] dark:text-[#f8fafc] transition-colors duration-500" style={{ fontFamily: POPPINS }}>

      {/* Smart Cursor */}
      <SmartCursor />

      {/* Ambient Liquid Blobs Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="liquid-blob absolute top-10 left-10 w-96 h-96 bg-[#A9C0E0]/20 dark:bg-[#0E2F76]/30" />
        <div className="liquid-blob absolute bottom-20 right-20 w-80 h-80 bg-[#F4FEFF]/30 dark:bg-[#A9C0E0]/20" style={{ animationDelay: '2s' }} />
        <div className="liquid-blob absolute top-1/2 left-1/3 w-64 h-64 bg-[#0E2F76]/10 dark:bg-[#A9C0E0]/15" style={{ animationDelay: '4s' }} />
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes liquidMorph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          50% { border-radius: 70% 30% 50% 50% / 30% 70% 70% 30%; }
          75% { border-radius: 40% 60% 60% 40% / 60% 30% 60% 40%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes glassShine {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(169, 192, 224, 0.3), 0 0 40px rgba(169, 192, 224, 0.1); }
          50% { box-shadow: 0 0 30px rgba(169, 192, 224, 0.5), 0 0 60px rgba(169, 192, 224, 0.2); }
        }
        @keyframes smooth-slide-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes smooth-scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        /* High Quality Transitions */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        .smooth-transition {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .smooth-hover {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .page-transition {
          animation: smooth-slide-in 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .scale-transition {
          animation: smooth-scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* Smooth Scroll */
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 80px;
        }

        @supports (scrollbar-width: thin) {
          * {
            scrollbar-width: thin;
            scrollbar-color: rgba(169, 192, 224, 0.3) transparent;
          }
        }

        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(169, 192, 224, 0.3);
          border-radius: 10px;
          transition: background 0.3s ease;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(169, 192, 224, 0.5);
        }

        .ticker-track {
          display: flex;
          white-space: nowrap;
          animation: marquee 42s linear infinite;
        }
        .luxury-card {
          animation: fadeIn 0.6s ease-out;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          will-change: transform, box-shadow;
        }
        .luxury-card:hover {
          transform: translateY(-12px) scale(1.02);
        }
        .luxury-card:active {
          transform: translateY(-4px) scale(0.98);
        }
        .shimmer-effect {
          background: linear-gradient(
            90deg,
            rgba(14, 47, 118, 0) 0%,
            rgba(169, 192, 224, 0.3) 50%,
            rgba(14, 47, 118, 0) 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track, .luxury-card, .shimmer-effect { animation: none; }
        }

        /* Glassmorphism Tier 1: Light */
        .liquid-glass {
          background: rgba(244, 254, 255, 0.5);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(169, 192, 224, 0.2);
        }

        .liquid-glass::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.5px;
          background: linear-gradient(135deg,
            rgba(244, 254, 255, 0.6) 0%,
            rgba(169, 192, 224, 0.4) 50%,
            rgba(14, 47, 118, 0.3) 100%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .liquid-glass::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg,
            transparent,
            rgba(244, 254, 255, 0.3),
            transparent
          );
          animation: glassShine 3s infinite;
        }

        .dark .liquid-glass {
          background: rgba(14, 47, 118, 0.2);
          border: 1px solid rgba(169, 192, 224, 0.15);
        }

        /* Glassmorphism Tier 2: Strong */
        .liquid-glass-strong {
          background: rgba(244, 254, 255, 0.7);
          backdrop-filter: blur(32px) saturate(200%);
          -webkit-backdrop-filter: blur(32px) saturate(200%);
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(14, 47, 118, 0.12),
                      inset 0 1px 0 rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(169, 192, 224, 0.3);
        }

        .liquid-glass-strong::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(135deg,
            rgba(244, 254, 255, 0.8) 0%,
            rgba(169, 192, 224, 0.6) 50%,
            rgba(14, 47, 118, 0.4) 100%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .liquid-glass-strong::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle,
            rgba(244, 254, 255, 0.1) 0%,
            transparent 70%
          );
          animation: float 6s ease-in-out infinite;
          pointer-events: none;
        }

        .dark .liquid-glass-strong {
          background: rgba(14, 47, 118, 0.3);
          box-shadow: 0 8px 32px rgba(14, 47, 118, 0.5),
                      inset 0 1px 0 rgba(169, 192, 224, 0.2);
          border: 1px solid rgba(169, 192, 224, 0.2);
        }

        /* Liquid Morphism Effects */
        .liquid-morph {
          position: relative;
          animation: liquidMorph 10s ease-in-out infinite;
          transition: all 0.3s ease;
        }

        .liquid-blob {
          position: absolute;
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          filter: blur(40px);
          opacity: 0.5;
          animation: liquidMorph 8s ease-in-out infinite, float 6s ease-in-out infinite;
        }

        .glass-card {
          background: rgba(244, 254, 255, 0.1);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(169, 192, 224, 0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glass-card:hover {
          background: rgba(244, 254, 255, 0.15);
          border-color: rgba(169, 192, 224, 0.4);
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .dark .glass-card {
          background: rgba(14, 47, 118, 0.15);
        }

        .dark .glass-card:hover {
          background: rgba(14, 47, 118, 0.25);
        }
      `}</style>

      {/* ── Navigation ── */}
      <nav className="sticky top-0 z-40 liquid-glass-strong shadow-lg dark:shadow-2xl transition-all duration-500 backdrop-blur-xl">
        <div className="max-w-[1380px] mx-auto px-6 h-[60px] flex items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <img
              src={yomsanAuto3}
              alt="Yomsan Motors"
              className="h-20 w-auto object-contain transition-all duration-300 brightness-100 dark:brightness-0 dark:invert"
            />
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-7">
            {["Inventory", "Services", "About", "Contact"].map((item) => (
              <a
                key={item}
                href="#inventory"
                className="text-[12px] text-[#64748b] dark:text-[#94a3b8] hover:text-[#0E2F76] dark:hover:text-[#A9C0E0] transition-all duration-300 tracking-[0.05em] relative group"
                data-cursor-text={item}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0E2F76] dark:bg-[#A9C0E0] group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#25D366] text-white px-4 py-2 text-[11px] font-bold tracking-[0.08em] rounded-full hover:bg-[#22c55e] hover:shadow-lg hover:shadow-[#25D366]/30 active:scale-[0.95] transition-all duration-300 flex-shrink-0"
            style={{ fontFamily: POPPINS }}
            data-cursor-text="Chat"
          >
            <MessageCircle size={12} />
            WhatsApp Us
          </a>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2.5 rounded-full liquid-glass hover:shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Toggle theme"
            data-cursor-text={isDark ? "Light" : "Dark"}
          >
            {isDark ? (
              <Sun size={18} className="text-[#A9C0E0] transition-transform duration-300 hover:rotate-180" />
            ) : (
              <Moon size={18} className="text-[#0E2F76] transition-transform duration-300 hover:rotate-180" />
            )}
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-[1380px] mx-auto px-6 pt-8 pb-10">
        <HeroSection counts={counts} />
      </section>

      {/* ── Inventory ── */}
      <section id="inventory" className="max-w-[1380px] mx-auto px-6 pb-24">
        {/* Section Header */}
        <div className="flex items-end justify-between pb-6 mb-8 border-b border-[#e2e8f0]">
          <div>
            <div
              className="text-[9px] uppercase tracking-[0.3em] font-semibold mb-2"
              style={{ fontFamily: POPPINS, color: BLUE_LIGHT }}
            >
              Current Stock
            </div>
            <h2
              className="text-[1.4rem] font-black text-[#0f172a] dark:text-[#f8fafc] flex items-baseline gap-3"
              style={{ fontFamily: POPPINS }}
            >
              Our Inventory
              <span className="text-sm font-normal text-[#94a3b8] dark:text-[#64748b]">
                {filteredVehicles.length} / {vehicles.length}
              </span>
            </h2>
          </div>
          <button
            className="md:hidden flex items-center gap-2 text-[11px] text-[#64748b] dark:text-[#94a3b8] border border-[#e2e8f0] dark:border-[#1e293b] px-3 py-2 hover:border-[#3a3a3a] dark:hover:border-[#475569] hover:text-[#334155] dark:hover:text-[#cbd5e1] transition-all"
            onClick={() => setMobileFiltersOpen((o) => !o)}
            style={{ fontFamily: POPPINS }}
          >
            <Filter size={12} />
            Filters
          </button>
        </div>

        {/* Layout */}
        <div className="flex gap-7 items-start">
          {/* Sidebar */}
          <aside
            className={`w-52 flex-shrink-0 sticky top-[68px] ${
              mobileFiltersOpen ? "block" : "hidden"
            } md:block`}
          >
            <FilterSidebar filters={filters} onChange={setFilters} counts={counts} />
          </aside>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {filteredVehicles.length === 0 ? (
              <div className="py-24 text-center flex flex-col items-center gap-4">
                <div className="text-4xl text-[#222] dark:text-[#cbd5e1]">⊘</div>
                <p className="text-[#64748b] dark:text-[#94a3b8] text-sm" style={{ fontFamily: POPPINS }}>
                  No vehicles match your current filters.
                </p>
                <button
                  onClick={() => setFilters({ brand: "All", type: "All", status: "All" })}
                  className="text-[11px] uppercase tracking-wide transition-colors"
                  style={{ fontFamily: POPPINS, color: BLUE }}
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredVehicles.map((v) => (
                  <VehicleCard key={v.id} vehicle={v} onBook={setBookingVehicle} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#e2e8f0] py-8 px-6">
        <div className="max-w-[1380px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <img
              src={yomsanAuto3}
              alt="Yomsan Motors"
              className="h-8 w-auto object-contain opacity-50 dark:opacity-40 transition-all duration-300 dark:brightness-0 dark:invert"
            />
            <span className="text-[#94a3b8] text-[11px]" style={{ fontFamily: POPPINS }}>
              © 2024 Yomsan Motors Sdn. Bhd. All rights reserved.
            </span>
          </div>
          <div
            className="text-[9px] text-[#64748b] dark:text-[#94a3b8] uppercase tracking-[0.2em]"
            style={{ fontFamily: POPPINS }}
          >
            Premium · Certified · Trusted
          </div>
        </div>
      </footer>

      {/* ── Booking Modal ── */}
      <BookingModal vehicle={bookingVehicle} onClose={() => setBookingVehicle(null)} />
    </div>
  );
}

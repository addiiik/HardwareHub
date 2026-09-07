import random
from models.base_models import CategoryEnum, StatusEnum

BRANDS = {
    CategoryEnum.LAPTOP: ["Apple", "Dell", "Lenovo", "HP", "Asus", "Framework"],
    CategoryEnum.SMARTPHONE: ["Apple", "Samsung", "Google"],
    CategoryEnum.TABLET: ["Apple", "Samsung", "Microsoft", "Wacom"],
    CategoryEnum.MONITOR: ["Dell", "LG", "Samsung", "Asus", "BenQ", "Apple"],
    CategoryEnum.PERIPHERAL: ["Logitech", "Razer", "Keychron", "Apple", "Microsoft"],
    CategoryEnum.AUDIO: ["Sony", "Bose", "Sennheiser", "Elgato", "Anker", "Jabra"],
    CategoryEnum.ACCESSORY: ["Anker", "CalDigit", "Samsung", "Apple"],
    CategoryEnum.NETWORKING: ["TP-Link", "Cisco", "Ubiquiti"],
    CategoryEnum.OTHER: ["Apple", "Dell"]
}

NAMES = {
    CategoryEnum.LAPTOP: ["MacBook Pro 16", "MacBook Air M2", "XPS 15", "ThinkPad X1 Carbon", "EliteBook 840", "Zephyrus G14", "Framework 13"],
    CategoryEnum.SMARTPHONE: ["iPhone 15 Pro", "iPhone 13 Pro Max", "Galaxy S23", "Pixel 8 Pro", "Pixel Fold"],
    CategoryEnum.TABLET: ["iPad Pro 12.9", "iPad Air M1", "Galaxy Tab S9", "Surface Pro 9", "Cintiq Pro 16"],
    CategoryEnum.MONITOR: ["UltraSharp 27", "UltraFine 4K", "Odyssey G7", "ProArt Display", "Studio Display 27"],
    CategoryEnum.PERIPHERAL: ["MX Master 3", "Basilisk V2", "K2 Wireless Keyboard", "Magic Trackpad 2", "StreamCam", "C920 HD Pro"],
    CategoryEnum.AUDIO: ["WH-1000XM4", "QuietComfort 45", "Momentum 4", "Wave:3 USB Mic", "PowerConf H700", "Speak 750"],
    CategoryEnum.ACCESSORY: ["737 Power Bank", "TS4 Thunderbolt Dock", "T7 Shield 2TB SSD", "ScreenBar Halo", "Watch Series 9"],
    CategoryEnum.NETWORKING: ["AX6000 Wi-Fi 6 Router", "UniFi Dream Machine", "Catalyst Switch"],
    CategoryEnum.OTHER: ["Mac Mini M2", "Mac Studio M2 Max"]
}

def generate_items(total: int = 200):
    items = []
    categories = list(CategoryEnum)

    for i in range(1, total + 1):
        category = random.choice(categories)
        brand = random.choice(BRANDS[category])
        base_name = random.choice(NAMES[category])
        
        is_repair = random.random() < 0.15
        status = StatusEnum.IN_REPAIR if is_repair else StatusEnum.AVAILABLE

        year = random.randint(2021, 2024)
        month = random.randint(1, 12)
        day = random.randint(1, 28)
        purchase_date = f"{year}-{month:02d}-{day:02d}"

        prefix = brand[:3].upper()
        cat_prefix = category.value[:3].upper() if hasattr(category, 'value') else str(category)[:3].upper()
        serial_number = f"{prefix}-{cat_prefix}-{i:03d}"

        items.append({
            "id": i,
            "name": f"{brand} {base_name}",
            "brand": brand,
            "serialNumber": serial_number,
            "category": category,
            "purchaseDate": purchase_date,
            "status": status,
            "rentable": True
        })

    return items

SEED_ITEMS = generate_items(200)
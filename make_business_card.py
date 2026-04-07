from __future__ import annotations

from io import BytesIO
from pathlib import Path

import fitz
import qrcode
from PIL import Image, ImageChops
from reportlab.lib.colors import Color, HexColor, white
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas


SOURCE_PDF = Path(r"C:\Users\getne\Downloads\kelel_perfect_fintech_card.pdf")
OUTPUT_DIR = Path(r"C:\Projects\kelel It solution\output\pdf")
OUTPUT_PDF = OUTPUT_DIR / "kelel_business_card_redesign.pdf"
OUTPUT_PDF_V2 = OUTPUT_DIR / "kelel_business_card_fintech_corporate.pdf"
OUTPUT_PDF_V3 = OUTPUT_DIR / "kelel_business_card_minimal.pdf"
OUTPUT_PDF_V4 = OUTPUT_DIR / "kelel_business_card_luxury.pdf"
OUTPUT_PDF_V5 = OUTPUT_DIR / "kelel_business_card_modern_bold.pdf"
OUTPUT_PDF_V6 = OUTPUT_DIR / "kelel_business_card_executive_clean.pdf"
WEBSITE_URL = "https://kelelitsolution.com"
DEFAULT_PROFILE = {
    "name": "Getnet Amdu",
    "name_small_caps": "GETNET AMDU",
    "role_line_1": "Founder, Solutions Architect",
    "role_line_2": "& General Manager",
    "phone": "+251 942 137 249",
    "email": "info@kelel.com",
    "website": "kelelitsolution.com",
    "fintech_title": "Founder & Solutions Architect",
    "fintech_subtitle": "Enterprise software, fintech infrastructure, and AI delivery",
}
HEWAN_PROFILE = {
    "name": "Hewan Fantahun",
    "name_small_caps": "HEWAN FANTAHUN",
    "role_line_1": "Deputy General Manager",
    "role_line_2": "",
    "phone": "+251 913 165 499",
    "email": "info@kelelitsolution.com",
    "website": "kelelitsolution.com",
    "fintech_title": "Deputy General Manager",
    "fintech_subtitle": "Enterprise software, fintech infrastructure, and AI delivery",
}
CURRENT_PROFILE = DEFAULT_PROFILE.copy()

NAVY = HexColor("#08172D")
NAVY_2 = HexColor("#10284A")
NAVY_3 = HexColor("#183E69")
GREEN = HexColor("#2ED06E")
GREEN_DARK = HexColor("#159A4A")
TEXT_MUTED = HexColor("#AFC0D7")
TEXT_SOFT = HexColor("#D8E2EE")
WHITE_SOFT = HexColor("#F7FBFF")
CYAN = HexColor("#35C2FF")
STEEL = HexColor("#6E86A3")
PAPER = HexColor("#F5F1E8")
INK = HexColor("#142033")
SAND = HexColor("#D6CCBA")
OLIVE = HexColor("#617A55")
GOLD = HexColor("#C7A86A")
GOLD_SOFT = HexColor("#E3D0A4")
CHARCOAL = HexColor("#121212")
STONE = HexColor("#E8E0D1")
ORANGE = HexColor("#FF8A3D")
SKY = HexColor("#9ED8FF")
SLATE = HexColor("#243447")
TEAL = HexColor("#2F8F83")
MIST = HexColor("#EEF3F6")


def set_profile(profile: dict[str, str]) -> None:
    global CURRENT_PROFILE
    CURRENT_PROFILE = profile.copy()


def profile(name: str) -> str:
    return CURRENT_PROFILE[name]


def extract_page_images(pdf_path: Path) -> tuple[Image.Image, Image.Image]:
    doc = fitz.open(pdf_path)
    page = doc[0]
    images = page.get_images(full=True)
    if len(images) < 2:
        raise RuntimeError("Expected logo and QR images on the first page.")

    extracted: list[Image.Image] = []
    for image in images:
        xref = image[0]
        pix = fitz.Pixmap(doc, xref)
        if pix.n - pix.alpha > 3:
            pix = fitz.Pixmap(fitz.csRGB, pix)
        img = Image.open(BytesIO(pix.tobytes("png"))).convert("RGBA")
        extracted.append(img)
    doc.close()
    return extracted[1], extracted[0]


def trim_white(image: Image.Image, padding: int = 8) -> Image.Image:
    base = image.convert("RGB")
    bg = Image.new("RGB", base.size, (255, 255, 255))
    diff = ImageChops.difference(base, bg)
    bbox = diff.getbbox()
    if not bbox:
        return image
    left, top, right, bottom = bbox
    left = max(0, left - padding)
    top = max(0, top - padding)
    right = min(image.width, right + padding)
    bottom = min(image.height, bottom + padding)
    return image.crop((left, top, right, bottom))


def build_website_qr(url: str) -> Image.Image:
    qr = qrcode.QRCode(
        version=2,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=2,
    )
    qr.add_data(url)
    qr.make(fit=True)
    image = qr.make_image(fill_color="black", back_color="white").convert("RGBA")
    return image


def draw_corner_marks(pdf: canvas.Canvas, width: float, height: float) -> None:
    pdf.setStrokeColor(Color(1, 1, 1, alpha=0.12))
    pdf.setLineWidth(1)
    size = 9
    inset = 5
    for x, y, sx, sy in (
        (inset, height - inset, 1, -1),
        (width - inset, height - inset, -1, -1),
        (inset, inset, 1, 1),
        (width - inset, inset, 1, 1),
    ):
        pdf.line(x, y, x + (size * sx), y)
        pdf.line(x, y, x, y + (size * sy))


def draw_front(pdf: canvas.Canvas, width: float, height: float, logo: Image.Image, qr: Image.Image) -> None:
    pdf.setFillColor(NAVY)
    pdf.rect(0, 0, width, height, stroke=0, fill=1)

    pdf.setFillColor(NAVY_2)
    pdf.rect(0, height * 0.62, width, height * 0.2, stroke=0, fill=1)

    pdf.setFillColor(NAVY_3)
    pdf.rect(0, 0, width * 0.34, height, stroke=0, fill=1)

    pdf.setFillColor(GREEN)
    pdf.rect(0, 0, width, 5, stroke=0, fill=1)

    draw_corner_marks(pdf, width, height)

    logo_box_x = 16
    logo_box_y = height - 92
    logo_box_w = 62
    logo_box_h = 62
    pdf.setFillColor(white)
    pdf.roundRect(logo_box_x, logo_box_y, logo_box_w, logo_box_h, 10, stroke=0, fill=1)
    pdf.drawImage(
        ImageReader(logo),
        logo_box_x + 6,
        logo_box_y + 6,
        width=logo_box_w - 12,
        height=logo_box_h - 12,
        preserveAspectRatio=True,
        mask="auto",
        anchor="c",
    )

    text_x = 92
    pdf.setFillColor(white)
    pdf.setFont("Helvetica-Bold", 16.5)
    pdf.drawString(text_x, height - 36, "KELEL IT SOLUTION")
    pdf.setFillColor(TEXT_MUTED)
    pdf.setFont("Helvetica", 9.5)
    pdf.drawString(text_x, height - 50, "Smart Digital Systems for Africa")

    pdf.setFillColor(GREEN)
    pdf.rect(text_x, height - 58, 44, 2.2, stroke=0, fill=1)

    pdf.setFillColor(WHITE_SOFT)
    pdf.setFont("Helvetica-Bold", 14.3)
    pdf.drawString(16, 72, profile("name"))

    pdf.setFillColor(TEXT_SOFT)
    pdf.setFont("Helvetica", 7.5)
    pdf.drawString(16, 59, profile("role_line_1"))
    if profile("role_line_2"):
        pdf.drawString(16, 49, profile("role_line_2"))

    contact_y = 27
    contact_items = [
        (profile("phone"), 0),
        (profile("email"), 12),
        (profile("website"), 24),
    ]
    pdf.setFont("Helvetica", 10.3)
    for text, offset in contact_items:
        y = contact_y - offset
        pdf.setFillColor(GREEN)
        pdf.circle(18, y + 3, 1.6, stroke=0, fill=1)
        pdf.setFillColor(white)
        pdf.drawString(24, y, text)

    qr_box = 52
    qr_x = width - qr_box - 18
    qr_y = 22
    pdf.setFillColor(white)
    pdf.roundRect(qr_x, qr_y, qr_box, qr_box, 8, stroke=0, fill=1)
    pdf.drawImage(
        ImageReader(qr),
        qr_x + 5,
        qr_y + 5,
        width=qr_box - 10,
        height=qr_box - 10,
        preserveAspectRatio=True,
        mask="auto",
        anchor="c",
    )


def pill(pdf: canvas.Canvas, x: float, y: float, w: float, h: float, label: str) -> None:
    pdf.setFillColor(Color(1, 1, 1, alpha=0.06))
    pdf.roundRect(x, y, w, h, h / 2, stroke=0, fill=1)
    pdf.setStrokeColor(Color(1, 1, 1, alpha=0.12))
    pdf.roundRect(x, y, w, h, h / 2, stroke=1, fill=0)
    pdf.setFillColor(white)
    pdf.setFont("Helvetica-Bold", 8.6)
    pdf.drawCentredString(x + (w / 2), y + 6.1, label)


def draw_back(pdf: canvas.Canvas, width: float, height: float) -> None:
    pdf.setFillColor(NAVY)
    pdf.rect(0, 0, width, height, stroke=0, fill=1)

    pdf.setFillColor(Color(0.09, 0.24, 0.41, alpha=0.55))
    pdf.rect(0, height * 0.68, width, height * 0.32, stroke=0, fill=1)
    pdf.rect(0, 0, width, height * 0.16, stroke=0, fill=1)

    pdf.setFillColor(GREEN)
    pdf.rect(0, 0, width, 5, stroke=0, fill=1)

    draw_corner_marks(pdf, width, height)

    pdf.setFillColor(white)
    pdf.setFont("Helvetica-Bold", 18)
    pdf.drawCentredString(width / 2, height - 35, "KELEL IT SOLUTION")

    pdf.setFillColor(TEXT_MUTED)
    pdf.setFont("Helvetica", 9.5)
    pdf.drawCentredString(width / 2, height - 48, "Fintech infrastructure and enterprise platforms")

    pills = [
        (30, "Banking"),
        (88, "Payments"),
        (152, "Logistics"),
        (214, "AI"),
    ]
    for x, label in pills:
        pill(pdf, x, height - 77, 44 if label != "Payments" else 50, 17, label)

    pdf.setFillColor(WHITE_SOFT)
    pdf.setFont("Helvetica-Bold", 14.5)
    pdf.drawCentredString(width / 2, 83, "Secure. Scalable. Production-Ready.")

    pdf.setFillColor(GREEN)
    pdf.rect((width / 2) - 24, 73, 48, 2.6, stroke=0, fill=1)

    pdf.setFillColor(TEXT_SOFT)
    pdf.setFont("Helvetica", 8.8)
    pdf.drawCentredString(width / 2, 53, "Built for African institutions that need reliable digital systems.")

    pdf.setFillColor(TEXT_MUTED)
    pdf.setFont("Helvetica-Bold", 9)
    pdf.drawCentredString(width / 2, 20, "kelelitsolution.com")


def draw_front_fintech(pdf: canvas.Canvas, width: float, height: float, logo: Image.Image, qr: Image.Image) -> None:
    pdf.setFillColor(HexColor("#06111F"))
    pdf.rect(0, 0, width, height, stroke=0, fill=1)

    pdf.setFillColor(HexColor("#0B1F36"))
    pdf.rect(0, height - 38, width, 38, stroke=0, fill=1)

    pdf.setFillColor(HexColor("#0D2C4D"))
    pdf.rect(0, 0, width, 16, stroke=0, fill=1)

    pdf.setFillColor(CYAN)
    pdf.rect(0, 0, width, 3, stroke=0, fill=1)

    pdf.setStrokeColor(Color(1, 1, 1, alpha=0.08))
    pdf.setLineWidth(1)
    pdf.line(92, 28, 92, height - 24)
    pdf.line(16, 92, width - 16, 92)

    draw_corner_marks(pdf, width, height)

    pdf.setFillColor(white)
    pdf.roundRect(16, height - 70, 58, 40, 8, stroke=0, fill=1)
    pdf.drawImage(
        ImageReader(logo),
        22,
        height - 66,
        width=46,
        height=32,
        preserveAspectRatio=True,
        mask="auto",
        anchor="c",
    )

    pdf.setFillColor(white)
    pdf.setFont("Helvetica-Bold", 11.6)
    pdf.drawString(92, height - 28, "KELEL IT SOLUTION")
    pdf.setFillColor(STEEL)
    pdf.setFont("Helvetica", 7.6)
    pdf.drawString(92, height - 40, "Digital systems for finance, risk, and operations")

    pdf.setFillColor(CYAN)
    pdf.setFont("Helvetica-Bold", 7.6)
    pdf.drawString(16, 76, profile("name_small_caps"))
    pdf.setFillColor(white)
    pdf.setFont("Helvetica-Bold", 13.2)
    pdf.drawString(16, 60, profile("fintech_title"))
    pdf.setFillColor(STEEL)
    pdf.setFont("Helvetica", 7.6)
    pdf.drawString(16, 48, profile("fintech_subtitle"))

    rows = [
        ("M", profile("email")),
        ("T", profile("phone")),
        ("W", profile("website")),
    ]
    y = 30
    for label, value in rows:
        pdf.setFillColor(Color(0.21, 0.76, 1, alpha=0.15))
        pdf.circle(22, y + 2.6, 5.2, stroke=0, fill=1)
        pdf.setFillColor(CYAN)
        pdf.setFont("Helvetica-Bold", 6.5)
        pdf.drawCentredString(22, y + 0.8, label)
        pdf.setFillColor(TEXT_SOFT)
        pdf.setFont("Helvetica", 8.8)
        pdf.drawString(33, y, value)
        y -= 12

    qr_x = width - 62
    qr_y = 22
    pdf.setFillColor(white)
    pdf.roundRect(qr_x, qr_y, 46, 46, 6, stroke=0, fill=1)
    pdf.drawImage(
        ImageReader(qr),
        qr_x + 4,
        qr_y + 4,
        width=38,
        height=38,
        preserveAspectRatio=True,
        mask="auto",
        anchor="c",
    )


def draw_back_fintech(pdf: canvas.Canvas, width: float, height: float) -> None:
    pdf.setFillColor(HexColor("#06111F"))
    pdf.rect(0, 0, width, height, stroke=0, fill=1)

    pdf.setFillColor(HexColor("#0B1F36"))
    pdf.rect(0, height - 46, width, 46, stroke=0, fill=1)
    pdf.setFillColor(HexColor("#0D2C4D"))
    pdf.rect(0, 0, width, 18, stroke=0, fill=1)
    pdf.setFillColor(CYAN)
    pdf.rect(0, 0, width, 3, stroke=0, fill=1)

    draw_corner_marks(pdf, width, height)

    pdf.setFillColor(white)
    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawCentredString(width / 2, height - 30, "KELEL IT SOLUTION")
    pdf.setFillColor(STEEL)
    pdf.setFont("Helvetica", 7.6)
    pdf.drawCentredString(width / 2, height - 42, "Fintech and enterprise systems built for African institutions")

    cols = [44, 105, 168, 224]
    labels = ["Banking", "Payments", "Logistics", "AI"]
    pdf.setFont("Helvetica-Bold", 8.3)
    for x, label in zip(cols, labels):
        pdf.setFillColor(Color(0.21, 0.76, 1, alpha=0.14))
        pdf.roundRect(x - 22, 92, 44, 16, 8, stroke=0, fill=1)
        pdf.setFillColor(CYAN)
        pdf.drawCentredString(x, 97, label)

    pdf.setFillColor(white)
    pdf.setFont("Helvetica-Bold", 10.8)
    pdf.drawCentredString(width / 2, 68, "Secure infrastructure for production growth")
    pdf.setFillColor(CYAN)
    pdf.rect((width / 2) - 28, 58, 56, 2.5, stroke=0, fill=1)

    pdf.setFillColor(TEXT_SOFT)
    pdf.setFont("Helvetica", 7.4)
    pdf.drawCentredString(width / 2, 40, "From core platforms to integration layers, dashboards, and automation.")

    pdf.setFillColor(STEEL)
    pdf.setFont("Helvetica-Bold", 8.6)
    pdf.drawCentredString(width / 2, 15, "kelelitsolution.com")


def draw_front_minimal(pdf: canvas.Canvas, width: float, height: float, logo: Image.Image, qr: Image.Image) -> None:
    pdf.setFillColor(PAPER)
    pdf.rect(0, 0, width, height, stroke=0, fill=1)

    pdf.setFillColor(INK)
    pdf.rect(0, height - 10, width, 10, stroke=0, fill=1)
    pdf.setFillColor(OLIVE)
    pdf.rect(0, 0, width, 3, stroke=0, fill=1)

    pdf.setStrokeColor(SAND)
    pdf.setLineWidth(1)
    pdf.line(18, 106, width - 18, 106)
    pdf.line(18, 34, width - 18, 34)

    pdf.setFillColor(white)
    pdf.roundRect(18, 118, 44, 32, 6, stroke=0, fill=1)
    pdf.drawImage(
        ImageReader(logo),
        22,
        121,
        width=36,
        height=24,
        preserveAspectRatio=True,
        mask="auto",
        anchor="c",
    )

    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 13.4)
    pdf.drawString(72, 138, "KELEL IT SOLUTION")
    pdf.setFont("Helvetica", 8.2)
    pdf.setFillColor(OLIVE)
    pdf.drawString(72, 126, "Smart digital systems for Africa")

    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 15.2)
    pdf.drawString(18, 86, profile("name"))
    pdf.setFillColor(HexColor("#4F5C6E"))
    pdf.setFont("Helvetica", 7.6)
    pdf.drawString(18, 74, profile("role_line_1"))
    if profile("role_line_2"):
        pdf.drawString(18, 64, profile("role_line_2"))

    pdf.setFillColor(INK)
    pdf.setFont("Helvetica", 9.1)
    pdf.drawString(18, 42, profile("phone"))
    pdf.drawString(18, 30, profile("email"))
    pdf.drawString(18, 18, profile("website"))

    pdf.setFillColor(white)
    pdf.roundRect(width - 66, 34, 48, 48, 6, stroke=0, fill=1)
    pdf.drawImage(
        ImageReader(qr),
        width - 62,
        38,
        width=40,
        height=40,
        preserveAspectRatio=True,
        mask="auto",
        anchor="c",
    )


def draw_back_minimal(pdf: canvas.Canvas, width: float, height: float) -> None:
    pdf.setFillColor(PAPER)
    pdf.rect(0, 0, width, height, stroke=0, fill=1)

    pdf.setFillColor(INK)
    pdf.rect(0, height - 10, width, 10, stroke=0, fill=1)
    pdf.setFillColor(OLIVE)
    pdf.rect(0, 0, width, 3, stroke=0, fill=1)

    pdf.setStrokeColor(SAND)
    pdf.setLineWidth(1)
    pdf.line(24, 118, width - 24, 118)
    pdf.line(24, 48, width - 24, 48)

    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawCentredString(width / 2, 132, "KELEL IT SOLUTION")

    pdf.setFillColor(HexColor("#4F5C6E"))
    pdf.setFont("Helvetica", 8.6)
    pdf.drawCentredString(width / 2, 119, "Banking, Payments, Logistics, and AI")

    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawCentredString(width / 2, 80, "Secure. Scalable. Production-ready.")

    pdf.setFillColor(OLIVE)
    pdf.rect((width / 2) - 22, 71, 44, 2.2, stroke=0, fill=1)

    pdf.setFillColor(HexColor("#4F5C6E"))
    pdf.setFont("Helvetica", 8.7)
    pdf.drawCentredString(width / 2, 58, "Clean technology delivery for institutions that need reliability.")

    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 9)
    pdf.drawCentredString(width / 2, 26, "kelelitsolution.com")


def draw_front_luxury(pdf: canvas.Canvas, width: float, height: float, logo: Image.Image, qr: Image.Image) -> None:
    pdf.setFillColor(CHARCOAL)
    pdf.rect(0, 0, width, height, stroke=0, fill=1)

    pdf.setStrokeColor(Color(1, 1, 1, alpha=0.05))
    pdf.setLineWidth(1)
    pdf.rect(10, 10, width - 20, height - 20, stroke=1, fill=0)

    pdf.setFillColor(GOLD)
    pdf.rect(0, 0, width, 3, stroke=0, fill=1)
    pdf.rect(0, height - 3, width, 3, stroke=0, fill=1)

    pdf.setFillColor(white)
    pdf.roundRect(18, height - 72, 44, 44, 8, stroke=0, fill=1)
    pdf.drawImage(
        ImageReader(logo),
        22,
        height - 68,
        width=36,
        height=36,
        preserveAspectRatio=True,
        mask="auto",
        anchor="c",
    )

    pdf.setFillColor(GOLD_SOFT)
    pdf.setFont("Helvetica-Bold", 13.2)
    pdf.drawString(72, height - 34, "KELEL IT SOLUTION")
    pdf.setFont("Helvetica", 8.1)
    pdf.drawString(72, height - 46, "Elegant technology delivery for modern institutions")

    pdf.setStrokeColor(Color(0.78, 0.66, 0.42, alpha=0.35))
    pdf.line(18, 92, width - 18, 92)

    pdf.setFillColor(STONE)
    pdf.setFont("Helvetica-Bold", 15.6)
    pdf.drawString(18, 68, profile("name"))
    pdf.setFillColor(GOLD_SOFT)
    pdf.setFont("Helvetica", 7.6)
    pdf.drawString(18, 55, profile("role_line_1"))
    if profile("role_line_2"):
        pdf.drawString(18, 45, profile("role_line_2"))

    pdf.setFillColor(STONE)
    pdf.setFont("Helvetica", 8.5)
    pdf.drawString(18, 28, profile("phone"))
    pdf.drawString(18, 16, profile("email"))
    pdf.drawString(104, 16, profile("website"))

    pdf.setFillColor(white)
    pdf.roundRect(width - 66, 24, 48, 48, 6, stroke=0, fill=1)
    pdf.drawImage(
        ImageReader(qr),
        width - 62,
        28,
        width=40,
        height=40,
        preserveAspectRatio=True,
        mask="auto",
        anchor="c",
    )


def draw_back_luxury(pdf: canvas.Canvas, width: float, height: float) -> None:
    pdf.setFillColor(CHARCOAL)
    pdf.rect(0, 0, width, height, stroke=0, fill=1)

    pdf.setStrokeColor(Color(1, 1, 1, alpha=0.05))
    pdf.setLineWidth(1)
    pdf.rect(10, 10, width - 20, height - 20, stroke=1, fill=0)

    pdf.setFillColor(GOLD)
    pdf.rect(0, 0, width, 3, stroke=0, fill=1)
    pdf.rect(0, height - 3, width, 3, stroke=0, fill=1)

    pdf.setFillColor(GOLD_SOFT)
    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawCentredString(width / 2, 132, "KELEL IT SOLUTION")
    pdf.setFont("Helvetica", 8.5)
    pdf.drawCentredString(width / 2, 119, "Banking  •  Payments  •  Logistics  •  AI")

    pdf.setStrokeColor(Color(0.78, 0.66, 0.42, alpha=0.35))
    pdf.line(28, 106, width - 28, 106)
    pdf.line(28, 52, width - 28, 52)

    pdf.setFillColor(STONE)
    pdf.setFont("Helvetica-Bold", 10.2)
    pdf.drawCentredString(width / 2, 80, "Premium systems, built for reliability")

    pdf.setFillColor(GOLD)
    pdf.rect((width / 2) - 20, 70, 40, 2.2, stroke=0, fill=1)

    pdf.setFillColor(GOLD_SOFT)
    pdf.setFont("Helvetica", 8.2)
    pdf.drawCentredString(width / 2, 58, "Built to feel polished, dependable, and ready for production.")

    pdf.setFillColor(STONE)
    pdf.setFont("Helvetica-Bold", 9.2)
    pdf.drawCentredString(width / 2, 28, "kelelitsolution.com")


def draw_front_modern(pdf: canvas.Canvas, width: float, height: float, logo: Image.Image, qr: Image.Image) -> None:
    pdf.setFillColor(HexColor("#07111E"))
    pdf.rect(0, 0, width, height, stroke=0, fill=1)

    pdf.setFillColor(HexColor("#0D2744"))
    pdf.rect(0, height - 54, width, 54, stroke=0, fill=1)

    pdf.setFillColor(ORANGE)
    pdf.rect(0, 0, width * 0.38, height, stroke=0, fill=1)

    pdf.setFillColor(white)
    pdf.roundRect(18, 102, 60, 42, 8, stroke=0, fill=1)
    pdf.drawImage(
        ImageReader(logo),
        24,
        106,
        width=48,
        height=34,
        preserveAspectRatio=True,
        mask="auto",
        anchor="c",
    )

    pdf.setFillColor(white)
    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(92, 126, "KELEL IT SOLUTION")
    pdf.setFillColor(SKY)
    pdf.setFont("Helvetica", 8.4)
    pdf.drawString(92, 114, "Digital systems for finance, logistics, and AI")

    pdf.setFillColor(white)
    pdf.setFont("Helvetica-Bold", 16.4)
    pdf.drawString(18, 72, profile("name"))
    pdf.setFillColor(HexColor("#EAF3FF"))
    pdf.setFont("Helvetica", 7.4)
    pdf.drawString(18, 59, profile("role_line_1"))
    if profile("role_line_2"):
        pdf.drawString(18, 49, profile("role_line_2"))

    pdf.setFillColor(HexColor("#FFE7D6"))
    pdf.setFont("Helvetica-Bold", 7.4)
    pdf.drawString(18, 30, "PHONE")
    pdf.drawString(18, 18, "EMAIL")
    pdf.drawString(18, 6, "WEB")

    pdf.setFillColor(white)
    pdf.setFont("Helvetica", 8.9)
    pdf.drawString(52, 30, profile("phone"))
    pdf.drawString(52, 18, profile("email"))
    pdf.drawString(52, 6, profile("website"))

    pdf.setFillColor(white)
    pdf.roundRect(width - 66, 20, 48, 48, 6, stroke=0, fill=1)
    pdf.drawImage(
        ImageReader(qr),
        width - 62,
        24,
        width=40,
        height=40,
        preserveAspectRatio=True,
        mask="auto",
        anchor="c",
    )


def draw_back_modern(pdf: canvas.Canvas, width: float, height: float) -> None:
    pdf.setFillColor(HexColor("#07111E"))
    pdf.rect(0, 0, width, height, stroke=0, fill=1)

    pdf.setFillColor(HexColor("#0D2744"))
    pdf.rect(0, height - 48, width, 48, stroke=0, fill=1)
    pdf.setFillColor(ORANGE)
    pdf.rect(0, 0, width, 4, stroke=0, fill=1)

    pdf.setFillColor(white)
    pdf.setFont("Helvetica-Bold", 17)
    pdf.drawCentredString(width / 2, 130, "KELEL IT SOLUTION")
    pdf.setFillColor(SKY)
    pdf.setFont("Helvetica", 8.6)
    pdf.drawCentredString(width / 2, 117, "Banking, Payments, Logistics, and AI platforms")

    pdf.setFillColor(Color(1, 1, 1, alpha=0.08))
    pdf.roundRect(22, 78, width - 44, 26, 13, stroke=0, fill=1)
    pdf.setFillColor(white)
    pdf.setFont("Helvetica-Bold", 12.2)
    pdf.drawCentredString(width / 2, 87, "Built to move from idea to production fast")

    pdf.setFillColor(ORANGE)
    pdf.rect((width / 2) - 24, 68, 48, 2.4, stroke=0, fill=1)

    pdf.setFillColor(HexColor("#D6E7FA"))
    pdf.setFont("Helvetica", 8.4)
    pdf.drawCentredString(width / 2, 49, "Reliable delivery for institutions that need confidence and scale.")

    pdf.setFillColor(white)
    pdf.setFont("Helvetica-Bold", 9.2)
    pdf.drawCentredString(width / 2, 20, "kelelitsolution.com")


def draw_front_executive(pdf: canvas.Canvas, width: float, height: float, logo: Image.Image, qr: Image.Image) -> None:
    pdf.setFillColor(MIST)
    pdf.rect(0, 0, width, height, stroke=0, fill=1)

    pdf.setFillColor(SLATE)
    pdf.rect(0, height - 36, width, 36, stroke=0, fill=1)
    pdf.setFillColor(TEAL)
    pdf.rect(0, 0, width, 4, stroke=0, fill=1)

    pdf.setStrokeColor(Color(0.14, 0.2, 0.28, alpha=0.18))
    pdf.setLineWidth(1)
    pdf.line(18, 96, width - 18, 96)

    pdf.setFillColor(white)
    pdf.roundRect(18, 114, 44, 30, 6, stroke=0, fill=1)
    pdf.drawImage(
        ImageReader(logo),
        21,
        117,
        width=38,
        height=23,
        preserveAspectRatio=True,
        mask="auto",
        anchor="c",
    )

    pdf.setFillColor(SLATE)
    pdf.setFont("Helvetica-Bold", 12.8)
    pdf.drawString(72, 126, "KELEL IT SOLUTION")
    pdf.setFont("Helvetica", 8.1)
    pdf.setFillColor(HexColor("#5E7389"))
    pdf.drawString(72, 114, "Secure digital systems for modern institutions")

    pdf.setFillColor(SLATE)
    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawString(18, 72, profile("name"))
    pdf.setFont("Helvetica", 7.6)
    pdf.setFillColor(TEAL)
    pdf.drawString(18, 58, profile("role_line_1"))
    if profile("role_line_2"):
        pdf.drawString(18, 48, profile("role_line_2"))

    pdf.setFillColor(SLATE)
    pdf.setFont("Helvetica", 9)
    pdf.drawString(18, 36, profile("website"))
    pdf.drawString(18, 23, profile("phone"))
    pdf.setFont("Helvetica", 8.2)
    pdf.drawString(18, 10, profile("email"))

    pdf.setFillColor(white)
    pdf.roundRect(width - 60, 20, 40, 40, 6, stroke=0, fill=1)
    pdf.drawImage(
        ImageReader(qr),
        width - 57,
        23,
        width=34,
        height=34,
        preserveAspectRatio=True,
        mask="auto",
        anchor="c",
    )


def draw_back_executive(pdf: canvas.Canvas, width: float, height: float) -> None:
    pdf.setFillColor(MIST)
    pdf.rect(0, 0, width, height, stroke=0, fill=1)

    pdf.setFillColor(SLATE)
    pdf.rect(0, height - 38, width, 38, stroke=0, fill=1)
    pdf.setFillColor(TEAL)
    pdf.rect(0, 0, width, 4, stroke=0, fill=1)

    pdf.setStrokeColor(Color(0.14, 0.2, 0.28, alpha=0.18))
    pdf.setLineWidth(1)
    pdf.line(22, 98, width - 22, 98)
    pdf.line(22, 54, width - 22, 54)

    pdf.setFillColor(SLATE)
    pdf.setFont("Helvetica-Bold", 16.5)
    pdf.drawCentredString(width / 2, 118, "KELEL IT SOLUTION")
    pdf.setFillColor(HexColor("#5E7389"))
    pdf.setFont("Helvetica", 8.2)
    pdf.drawCentredString(width / 2, 105, "Banking, payments, logistics, and AI delivery")

    pdf.setFillColor(SLATE)
    pdf.setFont("Helvetica-Bold", 12.4)
    pdf.drawCentredString(width / 2, 80, "Built for trust, scale, and operational clarity")
    pdf.setFillColor(TEAL)
    pdf.rect((width / 2) - 24, 70, 48, 2.4, stroke=0, fill=1)

    pdf.setFillColor(SLATE)
    pdf.setFont("Helvetica", 8.3)
    pdf.drawCentredString(width / 2, 58, "Reliable systems delivered with clarity and care.")

    pdf.setFont("Helvetica-Bold", 9)
    pdf.drawCentredString(width / 2, 24, "kelelitsolution.com")


def build_pdf(output_path: Path, front_fn, back_fn, logo: Image.Image, qr: Image.Image, width: float, height: float, title: str) -> None:
    if output_path.exists():
        output_path.unlink()
    pdf = canvas.Canvas(str(output_path), pagesize=(width, height))
    pdf.setTitle(title)
    front_fn(pdf, width, height, logo, qr)
    pdf.showPage()
    back_fn(pdf, width, height)
    pdf.save()


def build_profile_set(
    profile_data: dict[str, str],
    logo: Image.Image,
    qr: Image.Image,
    width: float,
    height: float,
    suffix: str = "",
) -> list[Path]:
    set_profile(profile_data)
    suffix_part = f"_{suffix}" if suffix else ""
    outputs = [
        (
            OUTPUT_DIR / f"kelel_business_card_redesign{suffix_part}.pdf",
            draw_front,
            draw_back,
            f"Kelel IT Solution Business Card Redesign{suffix_part}",
        ),
        (
            OUTPUT_DIR / f"kelel_business_card_fintech_corporate{suffix_part}.pdf",
            draw_front_fintech,
            draw_back_fintech,
            f"Kelel IT Solution Business Card Fintech Corporate{suffix_part}",
        ),
        (
            OUTPUT_DIR / f"kelel_business_card_minimal{suffix_part}.pdf",
            draw_front_minimal,
            draw_back_minimal,
            f"Kelel IT Solution Business Card Minimal{suffix_part}",
        ),
        (
            OUTPUT_DIR / f"kelel_business_card_luxury{suffix_part}.pdf",
            draw_front_luxury,
            draw_back_luxury,
            f"Kelel IT Solution Business Card Luxury{suffix_part}",
        ),
        (
            OUTPUT_DIR / f"kelel_business_card_modern_bold{suffix_part}.pdf",
            draw_front_modern,
            draw_back_modern,
            f"Kelel IT Solution Business Card Modern Bold{suffix_part}",
        ),
        (
            OUTPUT_DIR / f"kelel_business_card_executive_clean{suffix_part}.pdf",
            draw_front_executive,
            draw_back_executive,
            f"Kelel IT Solution Business Card Executive Clean{suffix_part}",
        ),
    ]
    for path, front_fn, back_fn, title in outputs:
        build_pdf(path, front_fn, back_fn, logo, qr, width, height, title)
    return [item[0] for item in outputs]


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    logo_raw, _qr_raw = extract_page_images(SOURCE_PDF)
    logo = trim_white(logo_raw)
    qr = build_website_qr(WEBSITE_URL)

    source = fitz.open(SOURCE_PDF)
    page = source[0]
    width = float(page.rect.width)
    height = float(page.rect.height)
    source.close()

    default_outputs = build_profile_set(DEFAULT_PROFILE, logo, qr, width, height)
    hewan_outputs = build_profile_set(HEWAN_PROFILE, logo, qr, width, height, "hewan")
    for path in default_outputs + hewan_outputs:
        print(path)


if __name__ == "__main__":
    main()

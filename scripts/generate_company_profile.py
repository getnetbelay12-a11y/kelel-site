from __future__ import annotations

from pathlib import Path
from shutil import copyfile

import fitz
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    Image,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
PUBLIC_DIR = ROOT / "public" / "downloads"
PUBLIC_PROOF_DIR = ROOT / "public" / "proof"
TMP_DIR = ROOT / "tmp" / "pdfs"
OUTPUT_PDF = OUTPUT_DIR / "kelel-company-profile.pdf"
PUBLIC_PDF = PUBLIC_DIR / "kelel-company-profile.pdf"
LOGO_PATH = ROOT / "public" / "brand" / "kelel-logo-en.jpg"
SECONDARY_LOGO_PATH = ROOT / "public" / "brand" / "kelel-logo-am.jpg"

SITE_NAME = "Kelel IT Solution"
TAGLINE = "IT solutions, business systems, and digital transformation support."
INTRO = (
    "Kelel IT Solution helps organizations modernize operations, strengthen "
    "digital infrastructure, and launch dependable software and web platforms."
)
CONTACT_NAME = "Getnet Amdu Belay"
CONTACT_ROLE = "General Manager"
EMAIL = "info@kelelitsolution.com"
PHONE = "+251942137249"
LOCATION = "Addis Ababa, Ethiopia"
HOURS = "Mon - Sat, 8:30 AM - 6:00 PM"
WEBSITE = "https://kelelitsolution.com"

TRUST_POINTS = [
    "Leadership contact visible on the website",
    "Clear service coverage from infrastructure to software",
    "Direct project inquiry flow with working local contact details",
    "Responsive digital presence prepared for future case studies and client proof",
]

STRENGTHS = [
    (
        "Business-first delivery",
        "We position technology as a business enabler, not a disconnected technical exercise.",
    ),
    (
        "Clear stakeholder communication",
        "Decision-makers need clarity on scope, timelines, and impact, so communication stays direct and accountable.",
    ),
    (
        "Scalable foundations",
        "Websites and systems are shaped to support growth instead of forcing a restart later.",
    ),
]

SERVICES = [
    (
        "Managed IT Support",
        "Operational support, troubleshooting, device and user assistance, and service continuity for teams that need systems to stay available.",
    ),
    (
        "Network and Infrastructure",
        "Network setup, connectivity planning, infrastructure organization, and practical stability improvements for business operations.",
    ),
    (
        "Software and Web Systems",
        "Corporate websites, dashboards, portals, and custom software solutions built around real operational workflows.",
    ),
    (
        "Cloud, Security, and Advisory",
        "Cloud readiness, security-aware implementation, and technology planning that supports practical business growth.",
    ),
]

PROCESS = [
    "Assess the business need, risks, and current system gaps.",
    "Define the right solution path, scope, and delivery priorities.",
    "Implement with attention to usability, stability, and maintainability.",
    "Support handover, adoption, and the next phase of improvement.",
]

PROJECTS = [
    (
        "Multi-branch Operations Platform",
        "Structured a centralized workflow concept for teams that needed stronger visibility across operational tasks and reporting.",
    ),
    (
        "Corporate Website Modernization",
        "Reframed a business website around credibility, service clarity, and easier client contact for a more professional public image.",
    ),
    (
        "IT Infrastructure Improvement Track",
        "Mapped a phased improvement approach for infrastructure, support operations, and long-term systems readiness.",
    ),
]

READINESS = [
    "Certification-ready company profile and structure",
    "Operational contact clarity with direct leadership access",
    "Protected inquiry handling with owner assignment and follow-up workflow",
    "Proof-ready layout for case studies, certifications, and partner badges",
]

ASSURANCE = [
    "Visible executive contact and direct outreach channel",
    "Structured inquiry handling with protected internal inbox workflow",
    "Owner assignment, follow-up reminders, and audit history",
    "Production-ready support for email, CSV export, Sheets sync, and reminder digests",
]

INDUSTRIES = [
    "SMEs and growing enterprises",
    "Service companies and consultancies",
    "Operations-heavy organizations",
    "Teams modernizing internal workflows",
]

PRIMARY = colors.HexColor("#1d4b42")
PRIMARY_SOFT = colors.HexColor("#edf5f2")
ACCENT = colors.HexColor("#d35d2f")
ACCENT_DEEP = colors.HexColor("#8d3517")
TEXT = colors.HexColor("#13211d")
MUTED = colors.HexColor("#556660")
LINE = colors.HexColor("#d9ddd4")
WHITE = colors.white


def ensure_dirs() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_PROOF_DIR.mkdir(parents=True, exist_ok=True)
    TMP_DIR.mkdir(parents=True, exist_ok=True)


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="Kicker",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=9,
            leading=11,
            textColor=ACCENT_DEEP,
            spaceAfter=8,
            uppercase=True,
        )
    )
    styles.add(
        ParagraphStyle(
            name="HeroTitle",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=28,
            leading=31,
            textColor=TEXT,
            spaceAfter=10,
            alignment=TA_CENTER,
        )
    )
    styles.add(
        ParagraphStyle(
            name="HeroText",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=11.3,
            leading=17,
            textColor=MUTED,
            alignment=TA_CENTER,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SectionTitle",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=20,
            leading=24,
            textColor=TEXT,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BodyStrong",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=11,
            leading=15,
            textColor=TEXT,
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Body",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=10.6,
            leading=16,
            textColor=MUTED,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CenteredSmall",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9.2,
            leading=13,
            textColor=MUTED,
            alignment=TA_CENTER,
        )
    )
    return styles


def draw_page_frame(canvas, doc) -> None:
    width, height = A4
    canvas.saveState()
    canvas.setFillColor(PRIMARY)
    canvas.rect(0, height - 18, width, 18, stroke=0, fill=1)
    canvas.setFillColor(ACCENT)
    canvas.rect(0, 0, width, 8, stroke=0, fill=1)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 9)
    canvas.drawString(doc.leftMargin, 20, SITE_NAME)
    page_label = f"Page {canvas.getPageNumber()}"
    canvas.drawRightString(width - doc.rightMargin, 20, page_label)
    canvas.restoreState()


def paragraph(text: str, style_name: str, styles):
    return Paragraph(text, styles[style_name])


def bullet_rows(items: list[str], styles, background=WHITE):
    rows = []
    for item in items:
        rows.append(
            [
                Paragraph('<font color="#d35d2f"><b>-</b></font>', styles["BodyStrong"]),
                Paragraph(item, styles["Body"]),
            ]
        )
    table = Table(rows, colWidths=[0.34 * inch, 6.35 * inch], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), background),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (0, -1), 6),
                ("RIGHTPADDING", (0, 0), (0, -1), 2),
                ("LEFTPADDING", (1, 0), (1, -1), 10),
                ("RIGHTPADDING", (1, 0), (1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("LINEBELOW", (0, 0), (-1, -2), 0.5, LINE),
            ]
        )
    )
    return table


def key_value_table(styles):
    data = [
        ["Primary contact", f"{CONTACT_NAME} - {CONTACT_ROLE}"],
        ["Email", EMAIL],
        ["Phone", PHONE],
        ["Location", LOCATION],
        ["Hours", HOURS],
        ["Website", WEBSITE],
    ]
    rows = []
    for label, value in data:
        rows.append(
            [
                Paragraph(label, styles["BodyStrong"]),
                Paragraph(value, styles["Body"]),
            ]
        )
    table = Table(rows, colWidths=[1.45 * inch, 5.45 * inch], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PRIMARY_SOFT),
                ("BOX", (0, 0), (-1, -1), 1, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.8, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 9),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def two_column_cards(items: list[tuple[str, str]], styles):
    cards = []
    for title, copy in items:
        card = Table(
            [
                [Paragraph(title, styles["BodyStrong"])],
                [Paragraph(copy, styles["Body"])],
            ],
            colWidths=[3.2 * inch],
        )
        card.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), WHITE),
                    ("BOX", (0, 0), (-1, -1), 1, LINE),
                    ("LEFTPADDING", (0, 0), (-1, -1), 12),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                    ("TOPPADDING", (0, 0), (-1, -1), 10),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
                ]
            )
        )
        cards.append(card)

    rows = []
    for index in range(0, len(cards), 2):
        row = cards[index : index + 2]
        if len(row) == 1:
            row.append(Spacer(3.2 * inch, 0.1 * inch))
        rows.append(row)

    table = Table(rows, colWidths=[3.25 * inch, 3.25 * inch], hAlign="LEFT")
    table.setStyle(
        TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("BOTTOMPADDING", (0, 0), (-1, -1), 10)])
    )
    return table


def logo_panel(image_path: Path, caption: str, styles):
    image = Image(str(image_path), width=2.45 * inch, height=1.62 * inch)
    card = Table(
        [
            [image],
            [Paragraph(caption, styles["CenteredSmall"])],
        ],
        colWidths=[2.65 * inch],
    )
    card.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), WHITE),
                ("BOX", (0, 0), (-1, -1), 1, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 12),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ]
        )
    )
    return card


def build_story(styles):
    story = []

    cover_logo = Image(str(LOGO_PATH), width=3.3 * inch, height=2.15 * inch)
    logo_card = Table([[cover_logo]], colWidths=[6.7 * inch], hAlign="CENTER")
    logo_card.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), WHITE),
                ("BOX", (0, 0), (-1, -1), 1, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 18),
                ("RIGHTPADDING", (0, 0), (-1, -1), 18),
                ("TOPPADDING", (0, 0), (-1, -1), 18),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 18),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ]
        )
    )

    story.extend(
        [
            Spacer(1, 0.35 * inch),
            logo_card,
            Spacer(1, 0.22 * inch),
            paragraph("Company profile", "Kicker", styles),
            paragraph(SITE_NAME, "HeroTitle", styles),
            paragraph(TAGLINE, "HeroText", styles),
            Spacer(1, 0.08 * inch),
            paragraph(INTRO, "HeroText", styles),
            Spacer(1, 0.26 * inch),
            key_value_table(styles),
            Spacer(1, 0.18 * inch),
            paragraph("Trust points", "SectionTitle", styles),
            bullet_rows(TRUST_POINTS, styles, PRIMARY_SOFT),
            PageBreak(),
            paragraph("How Kelel works", "SectionTitle", styles),
            paragraph(
                "Kelel IT Solution is positioned to help organizations improve operations, infrastructure, and digital systems with more clarity.",
                "Body",
                styles,
            ),
            Spacer(1, 0.08 * inch),
            two_column_cards(STRENGTHS, styles),
            Spacer(1, 0.1 * inch),
            paragraph("Delivery process", "SectionTitle", styles),
            bullet_rows(PROCESS, styles),
            PageBreak(),
            paragraph("Solutions and proof direction", "SectionTitle", styles),
            paragraph(
                "The company profile is organized around practical service areas that decision-makers can understand quickly.",
                "Body",
                styles,
            ),
            Spacer(1, 0.08 * inch),
            two_column_cards(SERVICES, styles),
            Spacer(1, 0.08 * inch),
            paragraph("Case-study style highlights", "SectionTitle", styles),
            two_column_cards(PROJECTS, styles),
            PageBreak(),
            paragraph("Operational readiness", "SectionTitle", styles),
            bullet_rows(READINESS, styles, PRIMARY_SOFT),
            Spacer(1, 0.12 * inch),
            paragraph("Assurance points", "SectionTitle", styles),
            bullet_rows(ASSURANCE, styles),
            Spacer(1, 0.12 * inch),
            paragraph("Who we support", "SectionTitle", styles),
            bullet_rows(INDUSTRIES, styles, PRIMARY_SOFT),
            Spacer(1, 0.14 * inch),
            paragraph("Brand identity", "SectionTitle", styles),
        ]
    )

    logos = Table(
        [[logo_panel(LOGO_PATH, "English wordmark", styles), logo_panel(SECONDARY_LOGO_PATH, "Amharic wordmark", styles)]],
        colWidths=[3.25 * inch, 3.25 * inch],
        hAlign="LEFT",
    )
    logos.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP")]))
    story.extend(
        [
            logos,
            Spacer(1, 0.16 * inch),
            paragraph("Official contact", "SectionTitle", styles),
            paragraph(
                f"{CONTACT_NAME} serves as the public leadership contact for official communication, project discussions, and partnership inquiries. Reach Kelel at {EMAIL} or {PHONE}.",
                "Body",
                styles,
            ),
        ]
    )
    return story


def generate_pdf() -> None:
    ensure_dirs()
    styles = build_styles()
    doc = SimpleDocTemplate(
        str(OUTPUT_PDF),
        pagesize=A4,
        leftMargin=0.7 * inch,
        rightMargin=0.7 * inch,
        topMargin=0.6 * inch,
        bottomMargin=0.6 * inch,
        title="Kelel IT Solution Company Profile",
        author=SITE_NAME,
    )
    story = build_story(styles)
    doc.build(story, onFirstPage=draw_page_frame, onLaterPages=draw_page_frame)
    copyfile(OUTPUT_PDF, PUBLIC_PDF)
    render_preview_pages()


def render_preview_pages() -> None:
    doc = fitz.open(OUTPUT_PDF)
    for index, page in enumerate(doc[:3], start=1):
        pix = page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5), alpha=False)
        pix.save(PUBLIC_PROOF_DIR / f"company-profile-page-{index}.png")
    doc.close()


if __name__ == "__main__":
    generate_pdf()

import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site-content";

export type SeoPage = {
  slug: string;
  group: "services" | "solutions";
  path: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  intro: string;
  cta: string;
  sections: Array<{
    title: string;
    body: string;
    bullets?: string[];
  }>;
  related: Array<{ label: string; href: string }>;
  faqs: Array<{ question: string; answer: string }>;
  serviceType: string;
};

const areas =
  "Bole, Kazanchis, Piassa, Mexico, Sar Bet, Megenagna, CMC, Summit, Ayat, Lebu, Gerji, Lideta, Kirkos, Yeka, Akaki Kality, Burayu, Sebeta, Sululta, Dukem, and Bishoftu / Debre Zeit";

export const seoPages: SeoPage[] = [
  {
    slug: "it-solutions-addis-ababa",
    group: "services",
    path: "/services/it-solutions-addis-ababa",
    title: "IT Solutions Company in Addis Ababa | Kelel IT Solutions",
    description:
      "IT consulting, software development, cloud, database, integration, automation, website, and mobile app services for businesses in Addis Ababa, Ethiopia.",
    h1: "IT Solutions for Businesses in Addis Ababa",
    eyebrow: "Local IT solutions",
    intro:
      "Kelel IT Solutions supports organizations in Addis Ababa that need dependable technology foundations, better business systems, and cleaner digital operations. We help teams move from disconnected tools and manual processes toward secure websites, applications, databases, dashboards, and cloud-ready infrastructure.",
    cta: "Request a Consultation",
    serviceType: "IT consulting and implementation",
    sections: [
      {
        title: "Practical IT consulting for growing organizations",
        body:
          "The first mistake many companies make is buying tools before defining the operational problem. Kelel starts with the business workflow, the users, the data, the integration points, and the support model. From there we recommend the right mix of software development, database design, cloud deployment, security controls, websites, mobile applications, and automation.",
        bullets: [
          "Technology assessment and phased implementation planning",
          "Custom software, dashboards, portals, and admin consoles",
          "Database, API, payment, notification, and third-party integrations",
          "Cloud deployment, monitoring, backup, and secure access planning",
        ],
      },
      {
        title: "Coverage across Addis Ababa and nearby business areas",
        body: `Kelel IT Solutions supports businesses in Addis Ababa and nearby areas including ${areas}. We do not create thin neighborhood pages because that is weak SEO and weak strategy. One useful local service page should explain the real services clearly and help serious buyers understand whether Kelel can solve their problem.`,
      },
      {
        title: "Systems built for finance, schools, logistics, and enterprise work",
        body:
          "Many Ethiopian organizations need systems that can handle approvals, records, payments, audit trails, reporting, and mobile access. Kelel designs technology around those realities: branch and district dashboards for financial services, onboarding and reconciliation for school fee payments, renewal flows for insurance, dispatch and maintenance workflows for fleet operations, and reporting layers for enterprise management.",
      },
    ],
    related: [
      { label: "Software development", href: "/services/software-development-ethiopia" },
      { label: "Website development", href: "/services/website-development-addis-ababa" },
      { label: "Mobile app development", href: "/services/mobile-app-development-ethiopia" },
      { label: "MongoDB consulting", href: "/services/mongodb-consulting-ethiopia" },
      { label: "Cloud services", href: "/services/cloud-services-ethiopia" },
      { label: "Cybersecurity", href: "/services/cybersecurity-company-ethiopia" },
    ],
    faqs: [
      {
        question: "What types of IT solutions does Kelel provide in Addis Ababa?",
        answer:
          "Kelel provides IT consulting, custom software, websites, mobile apps, database consulting, cloud deployment, integrations, automation, and security-aware implementation.",
      },
      {
        question: "Can Kelel support both websites and internal business systems?",
        answer:
          "Yes. Public websites, internal dashboards, portals, APIs, databases, and mobile applications can be planned together so the business has a coherent digital foundation.",
      },
      {
        question: "Do you serve businesses outside central Addis Ababa?",
        answer:
          "Yes. Kelel supports Addis Ababa and nearby areas including Bole, Megenagna, CMC, Summit, Ayat, Burayu, Sebeta, Sululta, Dukem, and Bishoftu.",
      },
      {
        question: "How should a company start an IT project with Kelel?",
        answer:
          "Start with a consultation that defines the workflow, users, data, security needs, integration points, timeline, and budget range before implementation begins.",
      },
    ],
  },
  {
    slug: "software-development-ethiopia",
    group: "services",
    path: "/services/software-development-ethiopia",
    title: "Software Development Company in Ethiopia | Kelel IT Solutions",
    description:
      "Custom software development in Ethiopia for business systems, admin consoles, dashboards, APIs, payment systems, reporting, and mobile backends.",
    h1: "Software Development Company in Ethiopia",
    eyebrow: "Custom software",
    intro:
      "Kelel IT Solutions builds custom software for Ethiopian businesses that need more than a generic template or spreadsheet workaround. We design workflow systems, admin consoles, dashboards, APIs, integrations, payment-ready platforms, reporting tools, and mobile/backend systems that match how the organization actually operates.",
    cta: "Build Your Software Platform",
    serviceType: "Custom software development",
    sections: [
      {
        title: "Business systems designed around real workflows",
        body:
          "Good software should reduce operational friction, not add another layer of confusion. Kelel maps roles, approvals, records, reports, notifications, and management visibility before implementation. That makes the platform easier to adopt and safer to maintain after launch.",
        bullets: [
          "Admin consoles for staff, managers, branches, and head office teams",
          "Dashboards for finance, operations, service, and executive reporting",
          "Workflow automation for approvals, requests, assignments, and follow-up",
          "APIs and integrations for payment systems, identity, messaging, and existing databases",
        ],
      },
      {
        title: "Industry software for Ethiopian market needs",
        body:
          "Banking platforms need onboarding, audit trails, transaction visibility, loan workflow, and core banking integration readiness. Schools need payment, receipt, onboarding, and reconciliation flows. Insurance teams need policy, claims, renewal, and customer notification workflows. Logistics teams need dispatch, trip, driver, fuel, maintenance, and reporting tools. Enterprise teams need ERP-style visibility across finance, HR, operations, and management reporting.",
      },
      {
        title: "Architecture that can grow after version one",
        body:
          "A rushed system can look cheap at launch and become expensive later. Kelel focuses on clean data models, maintainable code structure, secure authentication, role-based access, clear APIs, and deployment practices that support growth. The goal is not just to build screens; it is to build a platform the business can depend on.",
      },
    ],
    related: [
      { label: "Digital banking software", href: "/solutions/digital-banking-software-ethiopia" },
      { label: "School fee payment system", href: "/solutions/school-fee-payment-system-ethiopia" },
      { label: "Insurance management software", href: "/solutions/insurance-management-software-ethiopia" },
      { label: "Fleet management system", href: "/solutions/fleet-management-system-ethiopia" },
      { label: "MongoDB consulting", href: "/services/mongodb-consulting-ethiopia" },
    ],
    faqs: [
      {
        question: "What kind of software can Kelel build?",
        answer:
          "Kelel can build business systems, dashboards, admin portals, mobile backends, APIs, payment-ready workflows, reporting systems, and industry platforms.",
      },
      {
        question: "Can Kelel modernize an existing software system?",
        answer:
          "Yes. Modernization can include UX improvements, database redesign, performance work, reporting, integrations, security improvements, or phased rebuilds.",
      },
      {
        question: "Does custom software include mobile app support?",
        answer:
          "Yes. Kelel can build backend systems and APIs that support Android, iOS, Flutter, web dashboards, and admin consoles.",
      },
      {
        question: "What makes software development successful?",
        answer:
          "The project needs clear workflows, defined users, realistic scope, good data design, security controls, testing, deployment planning, and post-launch support.",
      },
    ],
  },
  {
    slug: "website-development-addis-ababa",
    group: "services",
    path: "/services/website-development-addis-ababa",
    title: "Website Development Company in Addis Ababa | Kelel IT Solutions",
    description:
      "SEO-ready business website development in Addis Ababa for company profiles, landing pages, portfolio sites, lead generation, analytics, and Google indexing.",
    h1: "Website Development Company in Addis Ababa",
    eyebrow: "SEO-ready websites",
    intro:
      "Kelel IT Solutions builds business websites in Addis Ababa for companies that need credibility, clear service communication, fast mobile performance, and a serious inquiry path. A website should not only look modern; it should be crawlable, understandable, easy to contact from, and prepared for Google indexing.",
    cta: "Build an SEO-ready Website",
    serviceType: "Website development",
    sections: [
      {
        title: "Websites that support business development",
        body:
          "Many company websites fail because they hide the offer behind vague branding. Kelel structures pages around the buyer's questions: what the company does, who it serves, what problems it solves, what proof can be shown honestly, and how to contact the team. That structure is better for users and better for search engines.",
        bullets: [
          "Corporate websites and company profile pages",
          "Landing pages for campaigns, services, and offers",
          "Portfolio and case-study structures for future proof assets",
          "Lead generation websites with contact forms and analytics readiness",
        ],
      },
      {
        title: "Technical SEO included from the foundation",
        body:
          "A professional website needs unique page titles, strong meta descriptions, clean URLs, headings, internal links, image alt text, structured data, sitemap.xml, robots.txt, canonical URLs, and mobile-first performance. Kelel treats these as core website requirements, not optional extras added after launch.",
      },
      {
        title: "Mobile-first performance and contact readiness",
        body:
          "Most visitors will judge the business quickly on a mobile device. We keep layouts responsive, reduce unnecessary weight, make forms clear, surface contact details, and prepare analytics and Search Console setup so the site can be monitored after deployment.",
      },
    ],
    related: [
      { label: "IT solutions", href: "/services/it-solutions-addis-ababa" },
      { label: "Software development", href: "/services/software-development-ethiopia" },
      { label: "Mobile app development", href: "/services/mobile-app-development-ethiopia" },
      { label: "Contact Kelel", href: "/contact" },
    ],
    faqs: [
      {
        question: "Can Kelel build SEO-ready websites?",
        answer:
          "Yes. Kelel builds websites with crawlable content, metadata, structured data, internal links, sitemap support, robots.txt, and mobile-first layouts.",
      },
      {
        question: "What kind of businesses need a company website?",
        answer:
          "Service companies, consultancies, technology firms, schools, logistics providers, insurers, and enterprises need websites that explain services and generate qualified inquiries.",
      },
      {
        question: "Can a website include contact forms and analytics?",
        answer:
          "Yes. Contact forms, analytics readiness, Search Console verification support, and conversion-focused contact paths can be included.",
      },
      {
        question: "Will the website be readable by Google?",
        answer:
          "The pages are built to be statically rendered or server-rendered so important content is available in the HTML for crawlers.",
      },
    ],
  },
  {
    slug: "mobile-app-development-ethiopia",
    group: "services",
    path: "/services/mobile-app-development-ethiopia",
    title: "Mobile App Development Company in Ethiopia | Kelel IT Solutions",
    description:
      "Mobile app development in Ethiopia for Flutter apps, customer apps, banking apps, insurance apps, school apps, logistics driver apps, APIs, and dashboards.",
    h1: "Mobile App Development Company in Ethiopia",
    eyebrow: "Mobile applications",
    intro:
      "Kelel IT Solutions builds mobile applications for Ethiopian businesses that need secure customer access, staff workflows, notifications, dashboards, and backend integration. We design apps as part of a full system, not as isolated screens disconnected from business operations.",
    cta: "Request a Mobile App Demo",
    serviceType: "Mobile app development",
    sections: [
      {
        title: "Flutter and mobile-ready system design",
        body:
          "A mobile app succeeds when the backend, API, authentication, data model, and operations workflow are planned together. Kelel can support Flutter-based delivery, Android and iOS readiness, secure login, push notifications, user profiles, dashboards, and admin tools for managing app activity.",
        bullets: [
          "Customer self-service apps for payments, requests, and account activity",
          "Banking, insurance, school, and logistics mobile workflows",
          "Driver, field staff, branch staff, and customer-facing app experiences",
          "API integration, notification services, role-based access, and reporting dashboards",
        ],
      },
      {
        title: "Apps for banking, insurance, schools, and logistics",
        body:
          "Banking apps can support onboarding, account services, loan requests, PIN reset, notifications, and payment workflows. School apps can support parent/student access, fee status, receipts, and announcements. Insurance apps can support policy status, renewal reminders, claims intake, and customer notifications. Logistics apps can support driver tasks, trip updates, proof of delivery, and dispatch visibility.",
      },
      {
        title: "Security and operational control",
        body:
          "Mobile systems often fail because the admin side is ignored. Kelel includes the control surfaces businesses need: admin consoles, audit trails, access roles, dashboard reporting, backup planning, and secure API integration. That gives managers visibility instead of leaving the app as a black box.",
      },
    ],
    related: [
      { label: "Software development", href: "/services/software-development-ethiopia" },
      { label: "Digital banking software", href: "/solutions/digital-banking-software-ethiopia" },
      { label: "Insurance software", href: "/solutions/insurance-management-software-ethiopia" },
      { label: "Fleet management", href: "/solutions/fleet-management-system-ethiopia" },
    ],
    faqs: [
      {
        question: "Does Kelel build Android and iOS apps?",
        answer:
          "Kelel can build mobile apps with Android and iOS readiness, commonly through Flutter-style cross-platform delivery and API-backed architecture.",
      },
      {
        question: "Can the mobile app connect to an existing system?",
        answer:
          "Yes. Apps can integrate with APIs, databases, payment workflows, authentication systems, notifications, and existing operational platforms.",
      },
      {
        question: "Do mobile apps need an admin dashboard?",
        answer:
          "Most serious business apps do. Admin dashboards help teams manage users, content, requests, reporting, approvals, and support issues.",
      },
      {
        question: "What should be defined before app development starts?",
        answer:
          "Define the user roles, main workflows, data model, security requirements, integrations, offline needs, reporting, and launch support process.",
      },
    ],
  },
  {
    slug: "digital-banking-software-ethiopia",
    group: "solutions",
    path: "/solutions/digital-banking-software-ethiopia",
    title: "Digital Banking Software in Ethiopia | Kelel IT Solutions",
    description:
      "Digital banking software for Ethiopian banks with mobile banking, Fayda KYC onboarding, loan workflow, school payments, dashboards, audit trails, and integration readiness.",
    h1: "Digital Banking Software for Ethiopian Banks",
    eyebrow: "Financial systems",
    intro:
      "Kelel IT Solutions designs digital banking software for Ethiopian banks that need customer mobile access, operational dashboards, onboarding workflows, payment services, loan request tracking, notifications, security controls, and integration readiness with core banking environments.",
    cta: "Request Digital Banking Demo",
    serviceType: "Digital banking software",
    sections: [
      {
        title: "Customer mobile app",
        body:
          "The customer mobile layer can support secure login, account services, transaction views, PIN reset workflows, loan requests, school fee payments, insurance reminders, notifications, and service requests. Fayda KYC onboarding readiness can be planned where integration access and compliance requirements are available.",
      },
      {
        title: "Bank admin console",
        body:
          "A digital banking platform needs strong internal control. The admin console can support customer onboarding review, user management, service configuration, payment monitoring, issue handling, reports, notification management, and operational oversight without forcing staff into disconnected spreadsheets.",
      },
      {
        title: "Branch, district, and head office dashboards",
        body:
          "Branch teams need local operational views. District and head office teams need broader visibility. Kelel can structure dashboards for branch activity, service requests, loan workflow, school payment activity, customer onboarding, exceptions, and management reporting.",
      },
      {
        title: "Loan workflow and school fee payment",
        body:
          "Loan request and tracking flows can help customers submit requests while internal teams review, assign, update, and report on progress. School fee payment can connect parents, schools, and bank operations through onboarding, payment records, receipts, reconciliation, and branch visibility.",
      },
      {
        title: "Security, audit trail, and integration readiness",
        body:
          "Banking software must be designed around secure authentication, access control, TLS, audit trails, logs, backup planning, and careful integration boundaries. Oracle or core banking integration readiness can be designed as an architecture layer, with final behavior depending on the bank's core system access, vendor constraints, and compliance requirements.",
      },
    ],
    related: [
      { label: "School fee payment", href: "/solutions/school-fee-payment-system-ethiopia" },
      { label: "MongoDB consulting", href: "/services/mongodb-consulting-ethiopia" },
      { label: "Cloud services", href: "/services/cloud-services-ethiopia" },
      { label: "Cybersecurity", href: "/services/cybersecurity-company-ethiopia" },
    ],
    faqs: [
      {
        question: "Can Kelel build a complete digital banking platform?",
        answer:
          "Kelel can design and build customer-facing, admin, dashboard, workflow, and integration-ready layers. Final integration depends on the bank's systems and approvals.",
      },
      {
        question: "Can the platform support Fayda KYC onboarding?",
        answer:
          "Fayda KYC readiness can be designed into the onboarding workflow where the bank has the required integration access, compliance approval, and implementation requirements.",
      },
      {
        question: "Does the platform support school fee payments?",
        answer:
          "Yes. School onboarding, parent/student payment, receipts, reconciliation, reports, and bank dashboard views can be included.",
      },
      {
        question: "How does Kelel approach banking security?",
        answer:
          "The architecture emphasizes secure authentication, access control, TLS, audit trails, logs, backup planning, and controlled integration boundaries.",
      },
    ],
  },
  {
    slug: "school-fee-payment-system-ethiopia",
    group: "solutions",
    path: "/solutions/school-fee-payment-system-ethiopia",
    title: "School Fee Payment System in Ethiopia | Kelel IT Solutions",
    description:
      "School fee payment system in Ethiopia for banks and schools with parent payments, onboarding, receipts, reconciliation, reports, dashboards, and notifications.",
    h1: "School Fee Payment System for Ethiopian Banks and Schools",
    eyebrow: "School payments",
    intro:
      "Kelel IT Solutions builds school fee payment systems for Ethiopian banks and schools that need cleaner parent/student payments, school onboarding, bank integration readiness, receipts, reconciliation, reporting, branch dashboard visibility, and notifications.",
    cta: "Request School Payment Demo",
    serviceType: "School fee payment software",
    sections: [
      {
        title: "Payment workflow for parents, students, schools, and banks",
        body:
          "A strong school fee payment system should reduce manual reconciliation and make payment status easier to verify. Kelel can structure parent/student lookup, invoice or fee assignment, payment confirmation, digital receipts, school-side views, and bank-side operational dashboards.",
      },
      {
        title: "School onboarding and reconciliation",
        body:
          "Schools need a clear way to register, configure grades or programs, upload student records where appropriate, review payments, and reconcile collections. Banks need visibility into payment volume, exceptions, branch activity, and settlement reporting. The platform can be designed to support both sides without exposing unnecessary data.",
      },
      {
        title: "Notifications, reports, and internal control",
        body:
          "Parents can receive payment status messages and receipts. Schools can receive collection reports. Bank staff can monitor exceptions, onboarding status, branch activity, and reconciliation. Access control and audit trails are important because payment systems affect trust immediately when records are unclear.",
      },
    ],
    related: [
      { label: "Digital banking software", href: "/solutions/digital-banking-software-ethiopia" },
      { label: "Software development", href: "/services/software-development-ethiopia" },
      { label: "Cloud services", href: "/services/cloud-services-ethiopia" },
      { label: "Contact Kelel", href: "/contact" },
    ],
    faqs: [
      {
        question: "Who uses the school fee payment system?",
        answer:
          "Parents, students, schools, bank branches, operations teams, and head office staff can use different role-based parts of the system.",
      },
      {
        question: "Can the system issue receipts?",
        answer:
          "Yes. Receipt generation and payment confirmation can be included, with reporting views for schools and banks.",
      },
      {
        question: "Can schools be onboarded into the platform?",
        answer:
          "Yes. School onboarding, configuration, student or fee setup, and access management can be designed into the workflow.",
      },
      {
        question: "Can this connect to a banking platform?",
        answer:
          "Yes. The system can be designed as part of a digital banking platform or integrated with bank systems where approved access is available.",
      },
    ],
  },
  {
    slug: "insurance-management-software-ethiopia",
    group: "solutions",
    path: "/solutions/insurance-management-software-ethiopia",
    title: "Insurance Management Software in Ethiopia | Kelel IT Solutions",
    description:
      "Insurance management software in Ethiopia for policy management, vehicle insurance, renewal reminders, claims workflow, QR verification, dashboards, and payment readiness.",
    h1: "Insurance Management Software for Ethiopian Insurers",
    eyebrow: "Insurance platforms",
    intro:
      "Kelel IT Solutions builds insurance management software for Ethiopian insurers that need cleaner policy workflows, vehicle insurance handling, renewal reminders, claims tracking, customer notifications, dashboards, QR verification, and payment readiness.",
    cta: "Request Insurance Platform Demo",
    serviceType: "Insurance management software",
    sections: [
      {
        title: "Policy and vehicle insurance workflow",
        body:
          "Insurance operations depend on accurate records, renewal timing, status visibility, and customer communication. Kelel can build policy management flows for customer records, vehicle insurance details, coverage periods, renewals, documents, verification, and internal review.",
      },
      {
        title: "Claims, reminders, and customer notifications",
        body:
          "Claims workflow can include intake, assignment, document collection, review status, approval steps, and reporting. Renewal reminders and customer notifications help reduce missed follow-up, while internal dashboards help managers see pending work and bottlenecks.",
      },
      {
        title: "Dashboards, QR verification, and payment readiness",
        body:
          "A modern insurance platform should give staff and leadership practical visibility. Dashboards can show policies, claims, renewals, branch activity, and exceptions. QR verification can help validate policy records where business rules allow it. Payment readiness can be designed for future integration with approved payment providers.",
      },
    ],
    related: [
      { label: "Mobile app development", href: "/services/mobile-app-development-ethiopia" },
      { label: "Software development", href: "/services/software-development-ethiopia" },
      { label: "Cybersecurity", href: "/services/cybersecurity-company-ethiopia" },
      { label: "Cloud services", href: "/services/cloud-services-ethiopia" },
    ],
    faqs: [
      {
        question: "Can Kelel build vehicle insurance workflows?",
        answer:
          "Yes. Vehicle records, policy periods, renewal reminders, verification, customer notifications, and reporting can be included.",
      },
      {
        question: "Can the software support claims workflow?",
        answer:
          "Yes. Claims intake, assignment, status tracking, document handling, review, approval, and reporting can be designed.",
      },
      {
        question: "Does the insurance platform support mobile access?",
        answer:
          "Mobile access can be included for customers, agents, or staff depending on the business workflow and security requirements.",
      },
      {
        question: "Can QR verification be included?",
        answer:
          "Yes. QR verification can be designed for policy validation where the insurer's business rules and data access model support it.",
      },
    ],
  },
  {
    slug: "fleet-management-system-ethiopia",
    group: "solutions",
    path: "/solutions/fleet-management-system-ethiopia",
    title: "Fleet Management System in Ethiopia | Kelel IT Solutions",
    description:
      "Fleet and logistics management system in Ethiopia for vehicles, drivers, dispatch, trips, maintenance, fuel, reminders, tracking, finance, HR, and reports.",
    h1: "Fleet and Logistics Management System in Ethiopia",
    eyebrow: "Fleet and logistics",
    intro:
      "Kelel IT Solutions builds fleet and logistics management systems for Ethiopian companies that need better control over vehicles, drivers, dispatch, trips, maintenance, fuel, tire/service reminders, customer tracking, finance, HR, dashboards, and reporting.",
    cta: "Request Fleet System Demo",
    serviceType: "Fleet and logistics software",
    sections: [
      {
        title: "Vehicle, driver, dispatch, and trip control",
        body:
          "Logistics operations can become expensive quickly when dispatch, trip records, driver assignments, and customer updates are managed manually. Kelel can structure a system for vehicle profiles, driver records, dispatch assignment, trip status, route notes, customer tracking, and proof-oriented reporting.",
      },
      {
        title: "Maintenance, fuel, tire, and service reminders",
        body:
          "Fleet reliability depends on maintenance discipline. The platform can track scheduled service, tire changes, fuel records, maintenance costs, reminders, incidents, and vehicle availability. Managers can see which assets are active, under maintenance, delayed, or costing more than expected.",
      },
      {
        title: "Logistics corridor operations and business reporting",
        body:
          "For logistics and corridor operations, visibility matters across dispatch, customers, vehicles, drivers, costs, and delivery timelines. Kelel can add dashboards for finance, HR, operations, customer service, and management reporting so the business has one operational view instead of fragmented records.",
      },
    ],
    related: [
      { label: "Logistics software", href: "/solutions/fleet-management-system-ethiopia" },
      { label: "Mobile app development", href: "/services/mobile-app-development-ethiopia" },
      { label: "Cloud services", href: "/services/cloud-services-ethiopia" },
      { label: "Software development", href: "/services/software-development-ethiopia" },
    ],
    faqs: [
      {
        question: "What can a fleet management system track?",
        answer:
          "It can track vehicles, drivers, dispatch, trips, fuel, maintenance, tires, service reminders, customer updates, costs, HR data, and reports.",
      },
      {
        question: "Can the system support driver mobile workflows?",
        answer:
          "Yes. Driver apps can support trip updates, task status, delivery notes, issue reporting, and communication with dispatch.",
      },
      {
        question: "Can Kelel build logistics dashboards?",
        answer:
          "Yes. Dashboards can show vehicle status, dispatch activity, trip performance, maintenance, finance, HR, and customer tracking views.",
      },
      {
        question: "Is this only for transport companies?",
        answer:
          "No. Any organization managing vehicles, drivers, maintenance, fuel, and dispatch can benefit from a fleet management system.",
      },
    ],
  },
  {
    slug: "mongodb-consulting-ethiopia",
    group: "services",
    path: "/services/mongodb-consulting-ethiopia",
    title: "MongoDB Consultant in Ethiopia | Kelel IT Solutions",
    description:
      "MongoDB consulting in Ethiopia for DBA support, performance tuning, indexing, schema design, replication, sharding, backup, recovery, security, TLS, Ops Manager, migrations, and AWS.",
    h1: "MongoDB Consulting Services in Ethiopia",
    eyebrow: "Database consulting",
    intro:
      "Kelel IT Solutions provides MongoDB consulting for Ethiopian businesses that need database design, performance tuning, DBA support, indexing, replication, sharding planning, backup and recovery, security hardening, TLS configuration, Ops Manager support, migrations, and cloud or AWS-ready architecture.",
    cta: "Request MongoDB Consultation",
    serviceType: "MongoDB consulting",
    sections: [
      {
        title: "MongoDB performance tuning and indexing",
        body:
          "MongoDB performance problems usually come from weak query patterns, missing indexes, poor schema decisions, unbounded document growth, or infrastructure constraints. Kelel can review query behavior, index strategy, read/write patterns, aggregation pipelines, and operational metrics to identify the highest-impact improvements.",
      },
      {
        title: "Schema design, replication, sharding, and migrations",
        body:
          "Document databases still need disciplined modeling. Kelel helps design schemas around access patterns, consistency needs, reporting, and growth. We can advise on replica sets, backup strategy, migration planning, sharding readiness, and environment design for production, staging, and development workflows.",
      },
      {
        title: "Security, TLS, backup, recovery, and cloud readiness",
        body:
          "Database security cannot be an afterthought. Kelel can support role-based access, network restrictions, TLS planning, backup and recovery procedures, monitoring, Ops Manager or cloud operations support, and AWS-ready deployment architecture. The objective is reliable data operations, not just a running database.",
      },
    ],
    related: [
      { label: "Software development", href: "/services/software-development-ethiopia" },
      { label: "Cloud services", href: "/services/cloud-services-ethiopia" },
      { label: "Cybersecurity", href: "/services/cybersecurity-company-ethiopia" },
      { label: "IT solutions", href: "/services/it-solutions-addis-ababa" },
    ],
    faqs: [
      {
        question: "Can Kelel help with slow MongoDB queries?",
        answer:
          "Yes. Kelel can review query patterns, indexes, schema design, aggregation pipelines, and infrastructure signals to improve performance.",
      },
      {
        question: "Does Kelel provide MongoDB DBA support?",
        answer:
          "Yes. Support can include operations review, backups, monitoring, security, replication, recovery planning, and performance diagnostics.",
      },
      {
        question: "Can Kelel help migrate data to MongoDB?",
        answer:
          "Yes. Migration planning can cover data modeling, import strategy, validation, downtime planning, rollback planning, and application changes.",
      },
      {
        question: "Can MongoDB be deployed securely in the cloud?",
        answer:
          "Yes. Secure deployment should include network controls, TLS, access roles, backup, monitoring, secrets management, and recovery procedures.",
      },
    ],
  },
  {
    slug: "cloud-services-ethiopia",
    group: "services",
    path: "/services/cloud-services-ethiopia",
    title: "Cloud Services in Ethiopia | Kelel IT Solutions",
    description:
      "Cloud services in Ethiopia for deployment, hosting, backup, monitoring, disaster recovery, cloud migration, AWS, Vercel, and secure architecture.",
    h1: "Cloud Services for Ethiopian Businesses",
    eyebrow: "Cloud infrastructure",
    intro:
      "Kelel IT Solutions supports Ethiopian businesses with cloud deployment, hosting, backup planning, monitoring, disaster recovery, cloud migration, AWS/Vercel-ready delivery, and secure architecture for websites, APIs, databases, dashboards, and business platforms.",
    cta: "Request Cloud Consultation",
    serviceType: "Cloud services",
    sections: [
      {
        title: "Deployment and hosting for business systems",
        body:
          "Cloud work should start with reliability, security, maintainability, and cost control. Kelel can help deploy websites, APIs, admin dashboards, databases, and internal systems with environment separation, domain setup, SSL/TLS, logging, and basic monitoring.",
      },
      {
        title: "Backup, monitoring, and disaster recovery",
        body:
          "A system is not production-ready just because it is online. Backup schedules, restore testing, monitoring, alerting, access control, and disaster recovery planning are essential. Kelel helps teams think through what happens when a server fails, data is corrupted, or traffic grows unexpectedly.",
      },
      {
        title: "Cloud migration and secure architecture",
        body:
          "For organizations moving from local servers or fragile hosting, Kelel can plan phased cloud migration. That includes architecture review, data migration, DNS, deployment pipelines, database operations, security controls, documentation, and handover so the business is not locked into a black box.",
      },
    ],
    related: [
      { label: "MongoDB consulting", href: "/services/mongodb-consulting-ethiopia" },
      { label: "Cybersecurity", href: "/services/cybersecurity-company-ethiopia" },
      { label: "Software development", href: "/services/software-development-ethiopia" },
      { label: "Digital banking software", href: "/solutions/digital-banking-software-ethiopia" },
    ],
    faqs: [
      {
        question: "What cloud platforms can Kelel support?",
        answer:
          "Kelel can support cloud-ready architecture for platforms such as AWS and Vercel, along with secure hosting and deployment planning.",
      },
      {
        question: "Does cloud service include backup planning?",
        answer:
          "Yes. Backup and recovery planning should be included for production websites, databases, APIs, and business systems.",
      },
      {
        question: "Can Kelel migrate an existing system to the cloud?",
        answer:
          "Yes. Migration can be phased around risk, data integrity, downtime limits, DNS, access control, and rollback planning.",
      },
      {
        question: "Is cloud hosting enough for production readiness?",
        answer:
          "No. Production readiness also needs monitoring, security, backups, access controls, documentation, and recovery procedures.",
      },
    ],
  },
  {
    slug: "cybersecurity-company-ethiopia",
    group: "services",
    path: "/services/cybersecurity-company-ethiopia",
    title: "Cybersecurity Company in Ethiopia | Kelel IT Solutions",
    description:
      "Cybersecurity services in Ethiopia for TLS, secure authentication, access control, audit logs, backup, vulnerability prevention, and secure deployment.",
    h1: "Cybersecurity Services for Ethiopian Businesses",
    eyebrow: "Security-aware delivery",
    intro:
      "Kelel IT Solutions supports Ethiopian businesses with practical cybersecurity services around TLS, secure authentication, access control, audit logs, backup, vulnerability prevention, secure deployment, and safer handling of business systems. We do not claim certifications that are not publicly established; we focus on real controls that reduce operational risk.",
    cta: "Request Security Review",
    serviceType: "Cybersecurity services",
    sections: [
      {
        title: "Security foundations for websites and business systems",
        body:
          "The strongest security improvements often start with basics done properly: HTTPS/TLS, strong authentication, password handling, session controls, role-based access, protected admin routes, logging, backups, dependency updates, and secure deployment practices.",
      },
      {
        title: "Access control, audit logs, and operational visibility",
        body:
          "Business platforms need clear rules for who can view, edit, approve, export, or delete records. Audit logs help teams understand important actions after they happen. Kelel can design access models and logging around the real roles inside banks, schools, insurers, logistics teams, and enterprise departments.",
      },
      {
        title: "Vulnerability prevention and secure deployment",
        body:
          "Security is weaker when it is added after launch. Kelel can support secure architecture review, environment configuration, secrets handling, backup routines, database access restrictions, deployment hardening, and practical vulnerability prevention for custom software and web systems.",
      },
    ],
    related: [
      { label: "Cloud services", href: "/services/cloud-services-ethiopia" },
      { label: "MongoDB consulting", href: "/services/mongodb-consulting-ethiopia" },
      { label: "Software development", href: "/services/software-development-ethiopia" },
      { label: "Digital banking software", href: "/solutions/digital-banking-software-ethiopia" },
    ],
    faqs: [
      {
        question: "Does Kelel claim formal cybersecurity certifications?",
        answer:
          "No certification is claimed here unless it is publicly available and verifiable. The service focuses on practical security controls and secure implementation.",
      },
      {
        question: "What security controls should a business system include?",
        answer:
          "A serious system should include TLS, authentication, role-based access, audit logs, backups, secure deployment, dependency management, and protected admin access.",
      },
      {
        question: "Can Kelel secure an existing web application?",
        answer:
          "Kelel can review and improve practical security areas such as access control, configuration, deployment, backup, database access, and logging.",
      },
      {
        question: "Why are audit logs important?",
        answer:
          "Audit logs help a business understand who performed important actions, when they happened, and what records or workflows were affected.",
      },
    ],
  },
  {
    slug: "erp-software-ethiopia",
    group: "services",
    path: "/services/erp-software-ethiopia",
    title: "ERP Software and Enterprise Integration in Ethiopia | Kelel IT Solutions",
    description:
      "ERP software and enterprise integration in Ethiopia for business workflows, dashboards, APIs, finance, operations, HR, reporting, and system modernization.",
    h1: "ERP Software and Enterprise Integration in Ethiopia",
    eyebrow: "Enterprise systems",
    intro:
      "Kelel IT Solutions builds ERP-style software and enterprise integration layers for Ethiopian businesses that need better control over workflows, dashboards, APIs, finance, operations, HR, reporting, and internal system modernization.",
    cta: "Discuss Enterprise Integration",
    serviceType: "ERP software and enterprise integration",
    sections: [
      {
        title: "Business workflows and management dashboards",
        body:
          "ERP work should not begin with a massive feature list. It should begin with the workflows that drive the business: finance, procurement, inventory, HR, approvals, operations, customer service, reporting, and management review. Kelel helps structure the system around the work that creates value and risk.",
      },
      {
        title: "APIs, integrations, and phased modernization",
        body:
          "Many companies already have partial systems in place. Kelel can build integration layers, APIs, dashboards, and phased modules so the organization improves without forcing an unrealistic all-at-once replacement. This is usually more practical for growing Ethiopian businesses.",
      },
      {
        title: "Finance, operations, HR, and reporting",
        body:
          "Enterprise systems need role-based access, structured records, reporting, exports, workflow status, and auditability. Kelel can build modules and dashboards for finance, operations, HR, management reporting, and cross-department visibility while keeping the architecture maintainable.",
      },
    ],
    related: [
      { label: "Software development", href: "/services/software-development-ethiopia" },
      { label: "Cloud services", href: "/services/cloud-services-ethiopia" },
      { label: "MongoDB consulting", href: "/services/mongodb-consulting-ethiopia" },
      { label: "IT solutions", href: "/services/it-solutions-addis-ababa" },
    ],
    faqs: [
      {
        question: "Does Kelel build full ERP systems?",
        answer:
          "Kelel can build ERP-style modules, dashboards, APIs, workflows, and integrations. Scope should be phased carefully to avoid an oversized first release.",
      },
      {
        question: "Can ERP work start with one department?",
        answer:
          "Yes. A phased start with finance, operations, HR, procurement, or reporting is often smarter than attempting every module at once.",
      },
      {
        question: "Can Kelel integrate existing systems?",
        answer:
          "Yes. Integration can include APIs, data synchronization, dashboards, reporting layers, and workflow bridges between existing tools.",
      },
      {
        question: "What makes enterprise integration risky?",
        answer:
          "Unclear ownership, weak data quality, undocumented workflows, poor access control, and unrealistic scope are common risks that must be addressed early.",
      },
    ],
  },
];

export const servicePages = seoPages.filter((page) => page.group === "services");
export const solutionPages = seoPages.filter((page) => page.group === "solutions");

export function findSeoPage(group: SeoPage["group"], slug: string) {
  return seoPages.find((page) => page.group === group && page.slug === slug);
}

export function serviceSchema(page: SeoPage) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    serviceType: page.serviceType,
    description: page.description,
    areaServed: [
      {
        "@type": "City",
        name: "Addis Ababa",
        addressCountry: "ET",
      },
      {
        "@type": "Country",
        name: "Ethiopia",
      },
    ],
    provider: {
      "@type": "LocalBusiness",
      name: site.name,
      url: absoluteUrl("/"),
      email: site.email,
      telephone: site.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Addis Ababa",
        addressCountry: "ET",
      },
    },
    url: absoluteUrl(page.path),
  };
}

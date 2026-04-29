import React from 'react';

function FinancialLiteracyHub() {
    const resources = [
        {
            category: "Campus Resources",
            items: [{ title: "VT Financial Wellness", desc: "Coaching and resources specifically for Virginia Tech students.", link: "https://hokiewellness.vt.edu/students/program_areas/financial_wellness.html" }]
        },
        {
            category: "Interactive Tools",
            items: [{ title: "Hit the Road Adventure", desc: "An interactive simulation game managing debt and financial trade-offs.", link: "https://mycreditunion.gov/learning-resources/learning-tools/hit-road" }]
        },
        {
            category: "Consumer Protection",
            items: [
                { title: "Ask CFPB", desc: "Plain English explanations of credit cards, mortgages, and student loans.", link: "https://www.consumerfinance.gov/ask-cfpb/" },
                { title: "FTC IdentityTheft.gov", desc: "The go-to federal agency for reporting scams and securing your digital self.", link: "https://www.identitytheft.gov/" },
                { title: "AnnualCreditReport.com", desc: "The only official site authorized by federal law for free annual credit reports.", link: "https://www.annualcreditreport.com/" }
            ]
        },
        {
            category: "Research & Planning",
            items: [
                { title: "Consumer Reports: Money", desc: "Unbiased advice on personal finance, banking, and sustainable purchasing.", link: "https://www.consumerreports.org/money/" },
                { title: "NSLDS Portal", desc: "Track your federal student loans and grants in the national database.", link: "https://nsldsfap.ed.gov/" }
            ]
        }
    ];

    return (
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', height: '100%', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#334155' }}>Financial Literacy Hub</h3>
                <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>Learn</span>
            </div>

            {/* Concept Box */}
            <div style={{ backgroundColor: '#f8fafc', borderLeft: '4px solid #86b08e', padding: '16px', marginBottom: '24px', borderRadius: '0 4px 4px 0' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.875rem', color: '#334155' }}>Concept Focus: Opportunity Costs</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b', lineHeight: '1.5' }}>
                    Every financial decision involves a trade-off. By tracking your <em>Consumption Process</em> (awareness, thinking, planning, deciding, evaluating), you can move away from impulsive purchases toward rational, value-based decision making.
                </p>
            </div>

            {/* Resource Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                {resources.map((section, idx) => (
                    <div key={idx}>
                        <h4 style={{ margin: '0 0 10px 0', fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {section.category}
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {section.items.map((item, itemIdx) => (
                                <li key={itemIdx} style={{ display: 'flex', flexDirection: 'column' }}>
                                    <a href={item.link} target="_blank" rel="noreferrer" style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '0.875rem', textDecoration: 'none', marginBottom: '4px' }}>
                                        {item.title}
                                    </a>
                                    <span style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: '1.4' }}>{item.desc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FinancialLiteracyHub;
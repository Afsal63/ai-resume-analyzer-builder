"use client";
import { motion } from "framer-motion";
import { Bot, PenTool, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={styles.heroContent}
        >
          <div className={styles.badge}>
            <Sparkles size={16} className={styles.badgeIcon} />
            <span>Powered by Advanced AI</span>
          </div>
          
          <h1 className={styles.title}>
            Craft the perfect resume <br />
            with <span className="gradient-text">Intelligent Insights</span>
          </h1>
          
          <p className={styles.subtitle}>
            Stop guessing what recruiters want. Our AI analyzes your experience, provides actionable feedback, and helps you build a stunning resume that stands out.
          </p>
          
          <div className={styles.ctaGroup}>
            <Button variant="primary" size="lg" onClick={() => router.push('/builder')}>
              Build Resume <PenTool size={18} />
            </Button>
            <Button variant="secondary" size="lg" onClick={() => router.push('/analyzer')}>
              Analyze Existing <Bot size={18} />
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className={`container ${styles.featuresSection}`}>
        <motion.div 
          className={styles.featuresGrid}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <Card hoverable className={styles.featureCard}>
            <div className={styles.featureIconWrapper} style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
              <Bot size={24} color="white" />
            </div>
            <h3>Smart Analysis</h3>
            <p>Upload your current resume and get an instant score. We identify weak points, formatting errors, and missing keywords.</p>
          </Card>
          
          <Card hoverable className={styles.featureCard}>
            <div className={styles.featureIconWrapper} style={{ background: 'var(--accent-gradient)' }}>
              <Sparkles size={24} color="white" />
            </div>
            <h3>AI Enhancement</h3>
            <p>Struggling with words? Let our AI rewrite your bullet points into powerful, action-driven statements that highlight your impact.</p>
          </Card>

          <Card hoverable className={styles.featureCard}>
             <div className={styles.featureIconWrapper} style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
               <PenTool size={24} color="white" />
            </div>
            <h3>Dynamic Builder</h3>
            <p>See your resume come to life in real-time. Our elegant split-screen editor ensures your layout looks professional at all times.</p>
          </Card>
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section className={`container ${styles.pricingSection}`}>
        <div className={styles.pricingHeader}>
          <h2>Simple, Transparent Pricing</h2>
          <p>Start for free, upgrade when you need more power.</p>
        </div>
        
        <div className={styles.pricingGrid}>
          <Card className={styles.pricingCard}>
            <h3>Hobby</h3>
            <div className={styles.price}>$0<span>/forever</span></div>
            <ul className={styles.featuresList}>
              <li>✨ 5 AI Tokens Included</li>
              <li>📄 Standard Resume Templates</li>
              <li>⬇️ PDF Downloads</li>
            </ul>
            <Button variant="secondary" className={styles.pricingBtn} onClick={() => router.push('/builder')}>
              Start Free
            </Button>
          </Card>
          
          <Card hoverable className={`${styles.pricingCard} ${styles.proCard}`}>
            <div className={styles.proBadge}>Most Popular</div>
            <h3>Pro</h3>
            <div className={styles.price}>$9.99<span>/one-time</span></div>
            <ul className={styles.featuresList}>
              <li>⚡ 50 Additional AI Tokens</li>
              <li>🚀 Premium Resume Analysis</li>
              <li>✨ Unlimited Template Adjustments</li>
              <li>⬇️ High-Res PDF Downloads</li>
            </ul>
            <Button variant="primary" className={styles.pricingBtn} onClick={() => alert("Please sign up and upgrade in the top menu!")}>
              Upgrade to Pro
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}

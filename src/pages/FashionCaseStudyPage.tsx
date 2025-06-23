import React from 'react';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Target, TrendingUp, Users, Palette, Sparkles, Brain, Star, ChevronRight } from 'lucide-react';
const FashionCaseStudyPage = () => {
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                AI Fashion Innovation
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Revolutionizing Personal Style with AI
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                How fashion.techrealm.pk transformed the styling industry with an AI-powered platform that delivers personalized fashion recommendations, achieving 94% user satisfaction and 3x engagement increase.
              </p>
              <div className="flex flex-wrap gap-6 justify-center text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  300% Engagement Increase
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  50K+ Active Users
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  94% Satisfaction Rate
                </div>
              </div>
            </div>
            
            {/* Hero Image Placeholder */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://res.cloudinary.com/dg4qodgmz/image/upload/v1749327182/Screenshot_2025-06-08_at_1.12.07_AM_rx3b9q.png" alt="Fashion stylist AI interface" className="w-full h-[400px] md:h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-lg font-medium">AI-Powered Style Recommendations</p>
                <p className="text-sm opacity-90">Personalized fashion insights in real-time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Overview */}
      <section className="py-16 border-t">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">About Fashion TechRealm</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Fashion.techrealm.pk is a pioneering platform that combines artificial intelligence with fashion expertise to deliver personalized styling solutions. Serving fashion enthusiasts across Pakistan and beyond, the platform needed to scale their styling capabilities while maintaining high-quality, personalized recommendations.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-primary" />
                    <span>Challenge: Manual styling process couldn't scale with growing user base</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-primary" />
                    <span>Solution: AI-powered recommendation engine with style analysis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span>Result: 300% increase in user engagement and style accuracy</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop" alt="Fashion consultant working" className="rounded-lg shadow-lg" />
                <div className="absolute -bottom-6 -right-6 glass rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold">50K+</p>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Approach */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Solution Architecture</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive approach combines machine learning, computer vision, and fashion expertise to deliver personalized styling recommendations.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <Brain className="w-12 h-12 mx-auto text-primary mb-4" />
                  <CardTitle>Style Analysis AI</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Advanced ML algorithms analyze user preferences, body type, lifestyle, and fashion trends to create personalized style profiles.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <Palette className="w-12 h-12 mx-auto text-primary mb-4" />
                  <CardTitle>Color & Pattern Matching</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Computer vision technology identifies optimal color combinations and pattern matching based on skin tone and personal preferences.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <Sparkles className="w-12 h-12 mx-auto text-primary mb-4" />
                  <CardTitle>Trend Forecasting</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Real-time trend analysis and forecasting keeps recommendations current with global fashion movements and seasonal changes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Results & Impact */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Measurable Impact & Results</h2>
              <p className="text-lg text-muted-foreground">
                The AI fashion stylist delivered exceptional results across all key performance indicators.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">94%</div>
                <div className="text-sm text-muted-foreground">User Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">300%</div>
                <div className="text-sm text-muted-foreground">Engagement Increase</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">85%</div>
                <div className="text-sm text-muted-foreground">Style Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
            </div>
            
            {/* Before/After Comparison */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Before AI Implementation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Manual styling process taking 2-3 hours per client
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Limited scalability with growing user base
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Inconsistent recommendation quality
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    High operational costs per user
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">After AI Implementation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Instant AI-powered recommendations in seconds
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Unlimited scalability for growing user base
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Consistent 85% accuracy across all recommendations
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    90% reduction in operational costs per user
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features & Capabilities</h2>
              <p className="text-lg text-muted-foreground">
                Comprehensive AI-powered features that transform the personal styling experience.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Personal Style Assessment</h3>
                    <p className="text-muted-foreground">
                      Comprehensive questionnaire and AI analysis to understand individual style preferences and lifestyle needs.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Smart Wardrobe Analysis</h3>
                    <p className="text-muted-foreground">
                      AI-powered analysis of existing wardrobe pieces with suggestions for new combinations and missing items.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Trend Integration</h3>
                    <p className="text-muted-foreground">
                      Real-time fashion trend analysis that incorporates current and upcoming trends into personalized recommendations.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Palette className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Color Palette Optimization</h3>
                    <p className="text-muted-foreground">
                      Advanced color theory application to determine the most flattering color palettes based on skin tone and preferences.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Occasion-Based Styling</h3>
                    <p className="text-muted-foreground">
                      Contextual recommendations for specific occasions, weather conditions, and cultural considerations.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Continuous Learning</h3>
                    <p className="text-muted-foreground">
                      Machine learning algorithms that improve recommendations based on user feedback and style evolution.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-6 h-6 fill-primary text-primary" />)}
              </div>
              <blockquote className="text-2xl md:text-3xl font-medium mb-6">
                "The AI stylist has completely transformed how we serve our clients. What used to take hours now happens in seconds, and the accuracy is remarkable. Our users love the personalized recommendations."
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <img src="https://res.cloudinary.com/dg4qodgmz/image/upload/v1749327347/61XrR_oB-gL._CR0_0_894_894_._US500_SCLZZZZZZZ__dximxg.jpg" alt="Sarah Ahmed" className="w-16 h-16 rounded-full object-cover" />
                <div className="text-left">
                  <p className="font-semibold">Natali
 Shevaniuk</p>
                  <p className="text-muted-foreground">Founder, Fashion TechRealm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Roadmap */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Future Roadmap</h2>
              <p className="text-lg text-muted-foreground">
                Continued innovation in AI-powered fashion technology.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ChevronRight className="w-5 h-5" />
                    Q2 2024
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• AR virtual try-on integration</li>
                    <li>• Social styling communities</li>
                    <li>• Advanced body type analysis</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ChevronRight className="w-5 h-5" />
                    Q3 2024
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Multi-language support</li>
                    <li>• Sustainable fashion focus</li>
                    <li>• Brand partnership platform</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ChevronRight className="w-5 h-5" />
                    Q4 2024
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Global marketplace integration</li>
                    <li>• Professional stylist network</li>
                    <li>• Advanced analytics dashboard</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Fashion Experience?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Discover how AI-powered styling can revolutionize your personal fashion journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Try Fashion AI
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg">
                View More Case Studies
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default FashionCaseStudyPage;
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Calendar, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { client } from '@/lib/sanityClient';
import { queries } from '@/lib/queries';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import StatsBar from '@/components/StatsBar';
import EventCard from '@/components/EventCard';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsData = await client.fetch(queries.upcomingEvents);
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Header />
      
      <main className="flex-1">
        <HeroSlider />
        <div className="relative z-20 -mt-10 md:-mt-20">
          <StatsBar />
        </div>

        {/* Mission Section */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 gradient-mesh opacity-60"></div>
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-5xl mx-auto">
              <motion.div 
                {...fadeInUp}
                className="text-center mb-16"
              >
                <div className="flex justify-center mb-6">
                  <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider flex items-center gap-2 border border-primary/20">
                    <Sparkles className="w-4 h-4" />
                    Our Mission
                  </span>
                </div>
                <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                  Building Tomorrow's <br/>
                  <span className="gradient-text">Leaders Today</span>
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  We empower students to become responsible citizens through active community service. 
                  Fostering leadership, empathy, and positive social change.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-primary rounded-[2.5rem] opacity-20 blur-xl group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative glass-card rounded-[2rem] p-8 md:p-16 text-center border-white/60">
                  <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-center">
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                        <Heart className="w-8 h-8" />
                      </div>
                      <h3 className="font-heading text-xl font-bold">Community Service</h3>
                      <p className="text-muted-foreground">Selfless dedication to society welfare.</p>
                    </div>
                    <div className="space-y-4 md:scale-110">
                      <div className="w-20 h-20 mx-auto bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                        <Sparkles className="w-10 h-10" />
                      </div>
                      <h3 className="font-heading text-2xl font-bold">Leadership</h3>
                      <p className="text-muted-foreground">Developing skills to lead with purpose.</p>
                    </div>
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto bg-nss-red/10 rounded-2xl flex items-center justify-center text-nss-red">
                        <Calendar className="w-8 h-8" />
                      </div>
                      <h3 className="font-heading text-xl font-bold">Active Participation</h3>
                      <p className="text-muted-foreground">Engaging in impactful regular events.</p>
                    </div>
                  </div>
                  <div className="mt-12">
                    <Button asChild size="lg" className="rounded-full px-8 text-base">
                      <Link to="/about">
                        Discover Our Story <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-24 bg-secondary/30 relative">
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <motion.div 
              {...fadeInUp}
              className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
            >
              <div className="max-w-2xl">
                <span className="text-accent font-bold tracking-wider uppercase mb-2 block">What's Happening</span>
                <h2 className="font-heading text-4xl md:text-5xl font-bold">Upcoming Events</h2>
              </div>
              <Button asChild variant="outline" className="rounded-full border-2 hover:bg-background">
                <Link to="/events">View All Events <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </motion.div>

            {loading ? (
              <div className="text-center py-20 bg-muted/50 rounded-3xl">
                <p className="text-muted-foreground font-medium">Loading events...</p>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-20 bg-muted/50 rounded-3xl">
                <p className="text-muted-foreground font-medium">No upcoming events scheduled.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.slice(0, 3).map((event, index) => (
                  <motion.div
                    key={event._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="font-heading text-5xl md:text-7xl font-black mb-8 text-white drop-shadow-sm tracking-tight leading-none">
                Make an Impact. <br/> Join the Movement.
              </h2>
              <p className="text-xl md:text-2xl mb-10 text-white/90 font-medium max-w-2xl mx-auto">
                Be part of a community that believes in the power of service. 
                Your journey to changing the world starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-10 h-14 rounded-full shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                  Become a Volunteer
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 hover:text-white bg-transparent text-lg px-10 h-14 rounded-full backdrop-blur-sm">
                  <Link to="/events">Explore Activities</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;


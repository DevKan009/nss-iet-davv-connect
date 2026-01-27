import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import Image from './Image';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

const EventCard = ({ event }) => {
  return (
    <Link to={`/events/${event.slug.current}`}>
      <Card className="overflow-hidden transition-all duration-500 hover:shadow-2xl h-full group border-0 shadow-lg hover:-translate-y-3 rounded-3xl bg-card">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={event.coverImage}
            alt={event.title}
            className="w-full h-full object-cover transition-all group-hover:scale-110 group-hover:rotate-1 duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          {event.isFeatured && (
            <Badge className="absolute top-5 right-5 bg-gradient-accent text-accent-foreground shadow-accent border-0 px-5 py-2 text-xs font-bold uppercase tracking-wide animate-glow">
              ⭐ Featured
            </Badge>
          )}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="absolute bottom-5 left-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-500"
          >
            <div className="glass-effect px-4 py-2 rounded-2xl">
              <p className="text-white text-sm font-bold">View Details →</p>
            </div>
          </motion.div>
        </div>
        <CardContent className="p-7 bg-card relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary"></div>
          <h3 className="font-heading text-2xl font-extrabold mb-5 line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-tight tracking-tight">
            {event.title}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              <div className="p-3 rounded-xl bg-gradient-primary mr-3 group-hover:scale-110 transition-transform shadow-primary">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <time dateTime={event.date} className="font-bold text-base">{formatDate(event.date)}</time>
            </div>
            {event.venue && (
              <div className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                <div className="p-3 rounded-xl bg-gradient-accent mr-3 group-hover:scale-110 transition-transform shadow-accent">
                  <MapPin className="h-5 w-5 text-accent-foreground" />
                </div>
                <span className="line-clamp-1 font-bold text-base">{event.venue}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;

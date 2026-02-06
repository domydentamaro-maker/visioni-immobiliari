import { Link } from "react-router-dom";
import { MapPin, Bed, Bath, Square, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PropertyCardProps {
  id: string | number;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  area: number;
  image: string;
  type: string;
}

const PropertyCard = ({ id, title, price, location, beds, baths, area, image, type }: PropertyCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
          {type}
        </Badge>
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 right-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>
      <CardContent className="p-6">
        <div className="mb-3">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
            <Link to={`/proprieta/${id}`}>{title}</Link>
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 py-3 border-y border-border text-sm">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4 text-muted-foreground" />
            <span>{beds}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4 text-muted-foreground" />
            <span>{baths}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-4 h-4 text-muted-foreground" />
            <span>{area} m²</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-2xl font-bold text-accent">{price}</p>
          </div>
          <Button asChild variant="outline" className="hover:bg-accent hover:text-accent-foreground hover:border-accent">
            <Link to={`/proprieta/${id}`}>Dettagli</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;

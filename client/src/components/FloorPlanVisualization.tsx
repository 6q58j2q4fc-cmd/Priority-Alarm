/**
 * 3D Floor Plan Visualization Component
 * Generates interactive floor plan layouts based on square footage and room selections
 */

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Maximize2,
  RotateCcw,
  Home,
  Bed,
  Bath,
  UtensilsCrossed,
  Sofa,
  Car,
  TreePine,
  Briefcase,
} from "lucide-react";

interface FloorPlanProps {
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
  garageSpaces: number;
  homeStyle: string;
}

interface Room {
  id: string;
  name: string;
  type: string;
  width: number;
  height: number;
  x: number;
  y: number;
  color: string;
  icon: React.ReactNode;
}

export default function FloorPlanVisualization({
  squareFootage,
  bedrooms,
  bathrooms,
  garageSpaces,
  homeStyle,
}: FloorPlanProps) {
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  // Calculate dimensions based on square footage
  const scaleFactor = Math.sqrt(squareFootage / 3500);
  const baseWidth = 400;
  const baseHeight = 300;
  const planWidth = baseWidth * scaleFactor;
  const planHeight = baseHeight * scaleFactor;

  // Generate rooms based on configuration
  const rooms = useMemo(() => {
    const generatedRooms: Room[] = [];
    let currentX = 10;
    let currentY = 10;
    const padding = 5;

    // Calculate room sizes based on total square footage
    const livingRoomSize = squareFootage * 0.15;
    const kitchenSize = squareFootage * 0.1;
    const diningSize = squareFootage * 0.08;
    const masterBedroomSize = squareFootage * 0.12;
    const bedroomSize = squareFootage * 0.08;
    const bathroomSize = squareFootage * 0.04;
    const garageSize = garageSpaces * 250;

    // Living Room
    const livingWidth = Math.sqrt(livingRoomSize) * 1.2;
    const livingHeight = livingRoomSize / livingWidth;
    generatedRooms.push({
      id: "living",
      name: "Living Room",
      type: "living",
      width: livingWidth * 0.8,
      height: livingHeight * 0.8,
      x: currentX,
      y: currentY,
      color: "#E8D5B7",
      icon: <Sofa className="w-4 h-4" />,
    });

    // Kitchen
    const kitchenWidth = Math.sqrt(kitchenSize) * 1.1;
    const kitchenHeight = kitchenSize / kitchenWidth;
    generatedRooms.push({
      id: "kitchen",
      name: "Kitchen",
      type: "kitchen",
      width: kitchenWidth * 0.8,
      height: kitchenHeight * 0.8,
      x: currentX + livingWidth * 0.8 + padding,
      y: currentY,
      color: "#C4A77D",
      icon: <UtensilsCrossed className="w-4 h-4" />,
    });

    // Dining Room
    const diningWidth = Math.sqrt(diningSize);
    const diningHeight = diningSize / diningWidth;
    generatedRooms.push({
      id: "dining",
      name: "Dining",
      type: "dining",
      width: diningWidth * 0.8,
      height: diningHeight * 0.8,
      x: currentX + livingWidth * 0.8 + padding,
      y: currentY + kitchenHeight * 0.8 + padding,
      color: "#D4C4A8",
      icon: <UtensilsCrossed className="w-4 h-4" />,
    });

    // Master Bedroom
    const masterWidth = Math.sqrt(masterBedroomSize) * 1.1;
    const masterHeight = masterBedroomSize / masterWidth;
    generatedRooms.push({
      id: "master",
      name: "Master Suite",
      type: "bedroom",
      width: masterWidth * 0.8,
      height: masterHeight * 0.8,
      x: currentX,
      y: currentY + livingHeight * 0.8 + padding,
      color: "#B8C4A8",
      icon: <Bed className="w-4 h-4" />,
    });

    // Master Bath
    generatedRooms.push({
      id: "master-bath",
      name: "Master Bath",
      type: "bathroom",
      width: Math.sqrt(bathroomSize * 1.5) * 0.8,
      height: (bathroomSize * 1.5) / Math.sqrt(bathroomSize * 1.5) * 0.8,
      x: currentX + masterWidth * 0.8 + padding,
      y: currentY + livingHeight * 0.8 + padding,
      color: "#A8C4D4",
      icon: <Bath className="w-4 h-4" />,
    });

    // Additional Bedrooms
    let bedroomX = currentX;
    let bedroomY = currentY + livingHeight * 0.8 + masterHeight * 0.8 + padding * 2;
    for (let i = 1; i < bedrooms; i++) {
      const bWidth = Math.sqrt(bedroomSize);
      const bHeight = bedroomSize / bWidth;
      generatedRooms.push({
        id: `bedroom-${i}`,
        name: `Bedroom ${i + 1}`,
        type: "bedroom",
        width: bWidth * 0.7,
        height: bHeight * 0.7,
        x: bedroomX,
        y: bedroomY,
        color: "#C4D4A8",
        icon: <Bed className="w-4 h-4" />,
      });
      bedroomX += bWidth * 0.7 + padding;
    }

    // Additional Bathrooms
    for (let i = 1; i < bathrooms; i++) {
      const bathWidth = Math.sqrt(bathroomSize);
      const bathHeight = bathroomSize / bathWidth;
      generatedRooms.push({
        id: `bath-${i}`,
        name: `Bath ${i + 1}`,
        type: "bathroom",
        width: bathWidth * 0.6,
        height: bathHeight * 0.6,
        x: bedroomX,
        y: bedroomY,
        color: "#A8D4C4",
        icon: <Bath className="w-4 h-4" />,
      });
      bedroomX += bathWidth * 0.6 + padding;
    }

    // Garage
    if (garageSpaces > 0) {
      const garageWidth = garageSpaces * 35;
      const garageHeight = 40;
      generatedRooms.push({
        id: "garage",
        name: `${garageSpaces}-Car Garage`,
        type: "garage",
        width: garageWidth,
        height: garageHeight,
        x: 10,
        y: bedroomY + 50,
        color: "#D4D4D4",
        icon: <Car className="w-4 h-4" />,
      });
    }

    // Office/Study for larger homes
    if (squareFootage >= 3000) {
      generatedRooms.push({
        id: "office",
        name: "Home Office",
        type: "office",
        width: 35,
        height: 30,
        x: currentX + livingWidth * 0.8 + kitchenWidth * 0.8 + padding * 2,
        y: currentY,
        color: "#D4C4B8",
        icon: <Briefcase className="w-4 h-4" />,
      });
    }

    // Outdoor living for premium homes
    if (squareFootage >= 4000) {
      generatedRooms.push({
        id: "outdoor",
        name: "Outdoor Living",
        type: "outdoor",
        width: 50,
        height: 35,
        x: currentX + livingWidth * 0.8 + kitchenWidth * 0.8 + padding * 2,
        y: currentY + 35,
        color: "#A8C4A8",
        icon: <TreePine className="w-4 h-4" />,
      });
    }

    return generatedRooms;
  }, [squareFootage, bedrooms, bathrooms, garageSpaces]);

  // Calculate total plan dimensions
  const maxX = Math.max(...rooms.map((r) => r.x + r.width)) + 20;
  const maxY = Math.max(...rooms.map((r) => r.y + r.height)) + 20;
  const viewBoxWidth = Math.max(maxX, 300);
  const viewBoxHeight = Math.max(maxY, 250);

  return (
    <Card className={`bg-white border-0 shadow-lg ${isFullscreen ? 'fixed inset-4 z-50' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="font-display text-lg text-timber flex items-center gap-2">
            <Home className="w-5 h-5 text-amber" />
            Interactive Floor Plan
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRotation((r) => (r + 90) % 360)}
              className="h-8 w-8 p-0"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="h-8 w-8 p-0"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {squareFootage.toLocaleString()} sq ft • {bedrooms} Bed • {bathrooms} Bath • {homeStyle}
        </p>
      </CardHeader>
      <CardContent>
        <div 
          className="relative bg-gradient-to-br from-stone/30 to-cream rounded-lg p-4 overflow-hidden"
          style={{ minHeight: isFullscreen ? 'calc(100vh - 200px)' : '300px' }}
        >
          {/* 3D Effect Container */}
          <div
            className="relative mx-auto transition-transform duration-500"
            style={{
              transform: `perspective(1000px) rotateX(15deg) rotateZ(${rotation}deg)`,
              transformStyle: 'preserve-3d',
              width: 'fit-content',
            }}
          >
            {/* Floor Plan SVG */}
            <svg
              viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
              className="w-full max-w-lg mx-auto"
              style={{ 
                filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.2))',
                maxHeight: isFullscreen ? '70vh' : '250px',
              }}
            >
              {/* Background */}
              <rect
                x="0"
                y="0"
                width={viewBoxWidth}
                height={viewBoxHeight}
                fill="#F5F0E8"
                rx="4"
              />

              {/* Rooms */}
              {rooms.map((room) => (
                <g
                  key={room.id}
                  onClick={() => setSelectedRoom(room.id === selectedRoom ? null : room.id)}
                  className="cursor-pointer transition-all duration-200"
                  style={{ transform: selectedRoom === room.id ? 'translateY(-2px)' : 'none' }}
                >
                  {/* Room shadow */}
                  <rect
                    x={room.x + 2}
                    y={room.y + 2}
                    width={room.width}
                    height={room.height}
                    fill="rgba(0,0,0,0.1)"
                    rx="2"
                  />
                  {/* Room */}
                  <rect
                    x={room.x}
                    y={room.y}
                    width={room.width}
                    height={room.height}
                    fill={room.color}
                    stroke={selectedRoom === room.id ? "#C87941" : "#8B7355"}
                    strokeWidth={selectedRoom === room.id ? 2 : 1}
                    rx="2"
                    className="transition-all duration-200 hover:brightness-105"
                  />
                  {/* Room label */}
                  <text
                    x={room.x + room.width / 2}
                    y={room.y + room.height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[6px] font-medium fill-timber pointer-events-none"
                  >
                    {room.name}
                  </text>
                </g>
              ))}

              {/* Compass */}
              <g transform={`translate(${viewBoxWidth - 30}, 20)`}>
                <circle cx="0" cy="0" r="12" fill="white" stroke="#8B7355" strokeWidth="1" />
                <text x="0" y="-3" textAnchor="middle" className="text-[6px] font-bold fill-timber">N</text>
                <polygon points="0,-8 -3,-2 3,-2" fill="#C87941" />
              </g>
            </svg>
          </div>

          {/* Room Details Panel */}
          {selectedRoom && (
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg animate-fade-in">
              <div className="flex items-center gap-2">
                {rooms.find((r) => r.id === selectedRoom)?.icon}
                <span className="font-display font-semibold text-timber">
                  {rooms.find((r) => r.id === selectedRoom)?.name}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Approx. {Math.round(
                  (rooms.find((r) => r.id === selectedRoom)?.width || 0) *
                  (rooms.find((r) => r.id === selectedRoom)?.height || 0) * 1.5
                )} sq ft
              </p>
            </div>
          )}
        </div>

        {/* Room Legend */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {[
            { type: "living", color: "#E8D5B7", label: "Living" },
            { type: "kitchen", color: "#C4A77D", label: "Kitchen" },
            { type: "bedroom", color: "#B8C4A8", label: "Bedroom" },
            { type: "bathroom", color: "#A8C4D4", label: "Bath" },
            { type: "garage", color: "#D4D4D4", label: "Garage" },
          ].map((item) => (
            <div key={item.type} className="flex items-center gap-1 text-xs">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

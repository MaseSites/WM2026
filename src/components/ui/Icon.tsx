import {
  Home, Radio, CalendarDays, Trophy, ListOrdered, Shield, Users, Newspaper,
  Sparkles, Medal, CircleUser, Search, Bell, ArrowRight, ArrowUpRight,
  TrendingUp, TrendingDown, Flame, Star, Clock, MapPin, Thermometer, Goal,
  Menu, X, ChevronRight, ChevronDown, Play, Percent, Activity, BarChart3,
  Zap, Target, Crosshair, Award, Crown, MessageSquare, Heart, Bookmark,
  Sun, Cloud, CloudRain, Droplets, CalendarCheck, Timer, Repeat,
  ShieldAlert, ExternalLink, Gauge, Wind, UserRound, Dot, Check,
  Command, CircleDot, Handshake, type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  Home, Radio, CalendarDays, Trophy, ListOrdered, Shield, Users, Newspaper,
  Sparkles, Medal, CircleUser, Search, Bell, ArrowRight, ArrowUpRight,
  TrendingUp, TrendingDown, Flame, Star, Clock, MapPin, Thermometer, Goal,
  Menu, X, ChevronRight, ChevronDown, Play, Percent, Activity, BarChart3,
  Zap, Target, Crosshair, Award, Crown, MessageSquare, Heart, Bookmark,
  Sun, Cloud, CloudRain, Droplets, CalendarCheck, Timer, Repeat,
  ShieldAlert, ExternalLink, Gauge, Wind, UserRound, Dot, Check,
  Command, CircleDot, Handshake,
};

export function Icon({
  name,
  className,
  size,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  const C = MAP[name] ?? CircleDot;
  return <C className={className} size={size} />;
}

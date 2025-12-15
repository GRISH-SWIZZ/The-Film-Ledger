# Film Ledger - Quick Component Reference

## 🎬 Video Player
```jsx
import { VideoPlayer } from '@/components/ui/VideoPlayer';

<VideoPlayer
  thumbnailUrl="https://image-url.jpg"
  videoUrl="https://www.youtube.com/embed/VIDEO_ID?autoplay=1"
  title="Movie Title - Trailer"
  description="Watch the official trailer"
  aspectRatio="16/9"
/>
```

## 🔍 Animated Search Bar
```jsx
import AnimatedSearchBar from '@/components/ui/AnimatedSearchBar';

<AnimatedSearchBar 
  value={searchTerm}
  onChange={setSearchTerm}
  placeholder="Search movies..."
/>
```

## 👤 Profile Popover
```jsx
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter } from '@/components/ui/popover';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

<Popover>
  <PopoverTrigger>
    <Avatar>
      <AvatarImage src={user.photo} />
      <AvatarFallback>UN</AvatarFallback>
    </Avatar>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>Header Content</PopoverHeader>
    <PopoverBody>Body Content</PopoverBody>
    <PopoverFooter>Footer Content</PopoverFooter>
  </PopoverContent>
</Popover>
```

## ✨ Box Reveal Animation
```jsx
import { BoxReveal } from '@/components/ui/BoxReveal';

<BoxReveal boxColor="#ff0000" duration={0.5}>
  <h1>Animated Content</h1>
</BoxReveal>
```

## 📝 Animated Input
```jsx
import { AnimatedInput } from '@/components/ui/AnimatedInput';

<AnimatedInput
  type="email"
  placeholder="Enter email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

## 🎨 Button Component
```jsx
import { Button } from '@/components/ui/button';

<Button variant="default" size="lg">Click Me</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
```

**Variants**: default, destructive, outline, secondary, ghost, link
**Sizes**: default, sm, lg, icon

## 🎯 Usage Tips

1. **Video Player**: Use on movie details pages for trailers
2. **Animated Search**: Use on explore/search pages
3. **Popover**: Use for dropdown menus, user profiles
4. **BoxReveal**: Use for page load animations
5. **AnimatedInput**: Use in forms for premium feel
6. **Button**: Use everywhere for consistency

## 🚀 All Components Are:
- ✅ Responsive
- ✅ Accessible
- ✅ Animated
- ✅ Swiss-red themed
- ✅ Production-ready

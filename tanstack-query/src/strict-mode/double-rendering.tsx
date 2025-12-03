import { useState } from "react";

export type Story = { id: number | string; label: string };

const initialStories: Story[] = [
  { id: 0, label: "Ankit's Story" },
  { id: 1, label: "Taylor's Story" },
];

// DOUBLE RENDERING

export function StoryTrayApp() {
  const [stories] = useState(initialStories)
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
      }}
    >
      <StoryTray stories={stories} />
    </div>
  );
}

export function StoryTray({ stories = [] }: { stories: Story[] }) {
  const [isHover, setIsHover] = useState(false);

  // CORRECT
  const items = stories.slice();
  items.push({ id: 'create', label: 'Create Story' });

  // WRONG
  // const items = stories;
  // items.push({ id: 'create', label: 'Create Story' });
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
      }}
    >
      <ul
        onPointerEnter={() => setIsHover(true)}
        onPointerLeave={() => setIsHover(false)}
        style={{
          backgroundColor: isHover ? '#ddd' : '#fff'
        }}
      >
        {items.map(story => (
          <li key={story.id}>
            {story.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
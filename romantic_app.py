import tkinter as tk
from tkinter import messagebox
import random
import math
from PIL import Image, ImageTk
import os

# Color scheme - Romantic pink theme
PINK = "#FF69B4"
DARK_PINK = "#FF1493"
LIGHT_PINK = "#FFB6C1"
WHITE = "#FFFFFF"
DARK_RED = "#DC143C"

class RomanticApp:
    def __init__(self, root):
        self.root = root
        self.root.title("💕 Happy Valentine's Day 💕")
        self.root.geometry("800x600")
        self.root.configure(bg=PINK)
        
        # Set window icon (if available)
        self.hearts = []
        self.heart_animation_running = True
        
        # Create main frame
        self.main_frame = tk.Frame(root, bg=PINK)
        self.main_frame.pack(expand=True, fill='both', padx=20, pady=20)
        
        # Title
        self.title_label = tk.Label(
            self.main_frame, 
            text="💕 Happy Valentine's Day 💕",
            font=("Georgia", 36, "bold"),
            bg=PINK,
            fg=DARK_RED
        )
        self.title_label.pack(pady=20)
        
        # Image placeholder - REPLACE 'girlfriend.jpg' with your girlfriend's photo
        self.image_label = tk.Label(self.main_frame, bg=PINK)
        self.image_label.pack(pady=10)
        self.load_image()
        
        # Message for girlfriend - REPLACE WITH HER NAME
        self.name_label = tk.Label(
            self.main_frame,
            text="My Sweetheart,",
            font=("Times New Roman", 24, "italic"),
            bg=PINK,
            fg=WHITE
        )
        self.name_label.pack(pady=10)
        
        # Romantic messages
        self.messages = [
            "Every moment with you is a precious gift.",
            "You are my sunshine on cloudy days.",
            "My heart belongs to you.",
            "I love you more than words can say.",
            "You make my life complete.",
            "Being with you is the best thing ever.",
            "You are my everything.",
            "My love for you grows stronger every day."
        ]
        
        self.message_label = tk.Label(
            self.main_frame,
            text=random.choice(self.messages),
            font=("Calibri", 16),
            bg=PINK,
            fg=WHITE,
            wraplength=500
        )
        self.message_label.pack(pady=20)
        
        # Button frame
        self.button_frame = tk.Frame(self.main_frame, bg=PINK)
        self.button_frame.pack(pady=30)
        
        # Yes button
        self.yes_button = tk.Button(
            self.button_frame,
            text="💖 Yes, I Love You! 💖",
            font=("Arial", 16, "bold"),
            bg=DARK_PINK,
            fg=WHITE,
            padx=30,
            pady=15,
            command=self.yes_clicked,
            relief=tk.RAISED,
            borderwidth=3
        )
        self.yes_button.pack(side=tk.LEFT, padx=10)
        
        # Maybe button (runs away!)
        self.no_button = tk.Button(
            self.button_frame,
            text="😅 Let Me Think...",
            font=("Arial", 14),
            bg=LIGHT_PINK,
            fg=DARK_PINK,
            padx=20,
            pady=10,
            command=self.no_clicked
        )
        self.no_button.pack(side=tk.LEFT, padx=10)
        
        # Canvas for heart animation
        self.canvas = tk.Canvas(root, width=800, height=100, bg=PINK, highlightthickness=0)
        self.canvas.pack(side=tk.BOTTOM)
        
        # Start animations
        self.animate_hearts()
        self.rotate_message()
        
    def load_image(self):
        """Load girlfriend's photo - REPLACE 'girlfriend.jpg' WITH ACTUAL IMAGE"""
        try:
            # Try to load image - CHANGE 'girlfriend.jpg' TO YOUR IMAGE FILE
            img = Image.open("girlfriend.jpg")
            img = img.resize((200, 200), Image.Resampling.LANCZOS)
            self.photo = ImageTk.PhotoImage(img)
            self.image_label.config(image=self.photo, bg=PINK)
        except FileNotFoundError:
            # Placeholder if no image found
            self.image_label.config(
                text="📷 Add your girlfriend's photo\nas 'girlfriend.jpg' in the same folder",
                font=("Arial", 12),
                fg=WHITE,
                bg=PINK
            )
        except Exception as e:
            print(f"Error loading image: {e}")
            
    def yes_clicked(self):
        """When Yes button is clicked"""
        self.heart_animation_running = False
        messagebox.showinfo("💕💕💕", 
            "YAY! 🥰\n\n" 
            "You just made me the happiest person in the world!\n\n"
            "I love you so much! 💖💖💖\n\n"
            "Happy Valentine's Day, My Love! 💕")
        self.heart_animation_running = True
        
    def no_clicked(self):
        """When Maybe button is clicked - it runs away!"""
        # Move button to random position
        x = random.randint(50, 600)
        y = random.randint(200, 400)
        self.no_button.place(x=x, y=y)
        
        # Change button text
        texts = ["Pretty Please? 🥺", "Don't say no 😢", "I love you! 💕", "Please? 🥺"]
        self.no_button.config(text=random.choice(texts))
        
    def animate_hearts(self):
        """Animate floating hearts"""
        if not self.heart_animation_running:
            return
            
        self.canvas.delete("all")
        
        # Create floating hearts
        for i in range(10):
            x = random.randint(0, 800)
            y = random.randint(0, 100)
            size = random.randint(10, 25)
            heart = "💕" if i % 2 == 0 else "💖"
            self.canvas.create_text(x, y, text=heart, font=("Arial", size), tags="heart")
            
        # Move hearts up
        self.canvas.move("heart", 0, -2)
        
        # Reset hearts that go off screen
        for item in self.canvas.find_withtag("heart"):
            coords = self.canvas.coords(item)
            if coords[1] < -20:
                self.canvas.move(item, random.randint(-50, 50), 120)
                
        # Schedule next animation frame
        self.root.after(50, self.animate_hearts)
        
    def rotate_message(self):
        """Rotate through romantic messages"""
        self.message_label.config(text=random.choice(self.messages))
        self.root.after(3000, self.rotate_message)

def main():
    root = tk.Tk()
    app = RomanticApp(root)
    
    # Center the window
    window_width = 800
    window_height = 600
    screen_width = root.winfo_screenwidth()
    screen_height = root.winfo_screenheight()
    x = (screen_width - window_width) // 2
    y = (screen_height - window_height) // 2
    root.geometry(f"{window_width}x{window_height}+{x}+{y}")
    
    root.mainloop()

if __name__ == "__main__":
    main()

from gpiozero import Servo
from time import sleep
import sys

GPIOpin = 21

myCorrection = 0
maxPW = (2.0+myCorrection)/1000
minPW = (1.0-myCorrection)/1000

servo = Servo(GPIOpin, min_pulse_width=minPW, max_pulse_width=maxPW)

# input can be -180 to 180
angle = float(sys.argv[1])/180
print(angle)
servo.value = (float(angle))/180

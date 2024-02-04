import machine
from machine import Pin
import ubinascii
import utime
from os import listdir
from os.path import isfile, join
from os import startfile

mypath = "" 
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]

# class Stepper:
#   def __init__(self, step_pin, dir_pin):
#     self.step_pin = Pin(step_pin, Pin.OUT)
#     self.dir_pin = Pin(dir_pin, Pin.OUT)
#     self.position = 0
#   def set_speed(self, speed):
#     self.delay = 1 / abs(speed)  # delay in seconds
#   def set_direction(self, direction):
#     self.dir_pin.value(direction)
#   def move_to(self, position):
#     self.set_direction(1 if position > self.position else 0)
#     while self.position != position:
#       self.step_pin.value(1)
#       utime.sleep(self.delay)
#       self.step_pin.value(0)
#       self.position += 1 if position > self.position else -1

def parse_data(data):
    return str(int(data[3:11].decode("ascii"), 16))


class RFID_READER:
  
  def __init__(self, uart, tx, rx):
    self.uart = machine.UART(uart, baudrate=9600, timeout=2, timeout_char=10, tx=tx, rx=rx)
    self.uart.init(9600)
    while self.uart.any():
      self.uart.read()
    self.current_rfid = 0

  def read_data(self):
    try:
      if self.uart.any():
        data = self.uart.read()
        if data:
          parsed_data = parse_data(data)
          if self.current_rfid != parsed_data:
            self.current_rfid = parsed_data
            return parsed_data
          else:
            return None
    except:
      pass


# step_pin = 12  # GPIO number where step pin is connected
# dir_pin = 13  # GPIO number where dir pin is connected
# stepper = Stepper(step_pin, dir_pin)

rfid = RFID_READER(1, 17, 16)
count = 0

while True:
  returned_data = rfid.read_data() # trigger
  if returned_data:
    startfile(onlyfiles[count])
    count += 1

class Player
  
  attr_reader :marker, :name

  def initialize(marker, name)
    @marker = marker
    @name = name
  end

end

class AIPlayer < Player

  def initialize(marker)
    super(marker, `scutil --get ComputerName`.strip)
  end

end

class Board
  # Keep track of board as a linear array as follows (the 0th element is always nil)
  # 1 2 3
  # 4 5 6
  # 7 8 9
  # Initially, board is empty
  # Board is populated by Players or nil

  WINNING_COMBINATIONS = [[1,2,3],[4,5,6],[7,8,9], # horizontal
                          [1,4,7],[2,5,8],[3,6,9], # vertical
                          [1,5,9],[3,5,7]]         # diagonal
  def initialize
    @board = Array.new(10, nil)
  end

  # returns indices of empty spots in an array
  def empty_spots
    empties = []
    9.times do |spot_index|
      spot = @board[spot_index + 1] # need 1 through 9
      empties << spot if spot.nil?
    end

    return empties
  end

  def check_for_win
    winning_combo = false
    winning_player = nil
    WINNING_COMBINATIONS.each do |line|
      if !(@board[line[0]].nil?) && @board[line[0]] == @board[line[1]] && @board[line[1]] == @board[line[2]]
        winning_combo = true
        winning_player = @board[line[0]] # pick the first element from the winning line, could be any
        break
      end
    end

    return [winning_combo, winning_player] # returns true or false and winning player if true (can toss the second return value if first is false)
  end

  # Puts a Player on a spot in the board. Checks to make sure it's a valid move, and returns true if successful.
  def play_at(index, player)
    if index < 1 || index > 9
      raise SpaceOutsideOfBoard
    elsif !(@board[index].nil?)
      raise SpaceTakenByPlayer
    else
      @board[index] = player
      true
    end
  end

  def draw
    3.times.each do |row|
      3.times.each do |col|
        if col == 0
          print " "
        else
          print " | "
        end
        # if no player exists in spot, print index, otherwise print player's marker
        if @board[(col + 1) + (row * 3)].nil?
          print (col + 1) + (row * 3)
        else
          print "#{@board[(col + 1) + (row * 3)].marker}"
        end
      end
      if row == 2
        print "\n"
      else
        print "\n-----------\n"
      end
    end
  end
end

class TicTacToeException < Exception
  def message
    "Something went wrong playing tic tac toe."
  end
end

class SpaceOutsideOfBoard < TicTacToeException
  def message
    "The space selected is outside of the board."
  end
end

class SpaceTakenByPlayer < TicTacToeException
  def message
    "The space selected is already occupied."
  end
end


puts "Welcome to Tic Tac Toe! Enter your name: "
name1 = gets.chomp
player1 = Player.new("X", name1)

#puts "Player 2, enter your name: "
#name2 = gets.chomp

player2 = AIPlayer.new("O")

puts "OK, here's the board you'll be playing on today!"
b = Board.new
b.draw

random = Random.new
first_mover = (random.rand(1..2) == 1 ) ? player1 : player2
movers = {1 => first_mover, 2 => (first_mover == player1 ? player2 : player1)}

# You can never move more than 10 times! On a 3x3 board, that is.
10.times do |move|
  if move >= 9
    puts "Ah crap. Meow is the word, nothing more can be done."
    break
  end

  mover = movers[((move - 1) % 2)+1]
  
  begin
    puts "Mover class: #{mover.class.to_s}"
    case mover.class.to_s
    when "Player"
      puts "Alright #{mover.name}, it's your turn. You're '#{mover.marker}'. Pick an available spot (1 - 9): "
      index = gets.chomp.to_i
    when "AIPlayer"
      puts "#{mover.name} will go now."
      random = Random.new(Time.now.to_i % 50)
      index = random.rand(1..9)
    end
    b.play_at(index, mover)
  rescue TicTacToeException => ex
    case mover.class.to_s
    when "Player"
      puts ex.message
    when "AIPlayer"
      # just keep on truckin
    end
    retry
  end
  win = b.check_for_win
  if win[0]
    b.draw
    puts "Congrats #{win[1].name}! You've won!!!!!! Go drink a beer."
    break
  end
  
  b.draw

end

puts "We're done here."





# puts "Welcome to Tic Tac Toe! Player 1, enter your name: "
# name1 = gets.chomp
# puts "Player 2, enter your name: "
# name2 = gets.chomp

# player1 = Player.new("X", name1)
# player2 = Player.new("O", name2)

# puts "OK, here's the board you'll be playing on today!"
# b = Board.new
# b.draw

# random = Random.new
# first_mover = (random.rand(1..2) == 1 ) ? player1 : player2
# movers = {1 => first_mover, 2 => (first_mover == player1 ? player2 : player1)}

# # You can never move more than 10 times! On a 3x3 board, that is.
# 10.times do |move|
#   if move >= 9
#     puts "Ah crap. Meow is the word, nothing more can be done."
#     break
#   end

#   mover = movers[((move - 1) % 2)+1]
  
#   begin
#     puts "Alright #{mover.name}, it's your turn. You're '#{mover.marker}'. Pick an available spot (1 - 9): "
#     index = gets.chomp.to_i
#     b.play_at(index, mover)
#   rescue TicTacToeException => ex
#     puts ex.message
#     retry
#   end
#   win = b.check_for_win
#   if win[0]
#     b.draw
#     puts "Congrats #{win[1].name}! You've won!!!!!! Go drink a beer."
#     break
#   end
  
#   b.draw

# end

# puts "We're done here."
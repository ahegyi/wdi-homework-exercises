class Menu
  OPERAND_HASH = { "A" => :add, "S" => :subtract,
                   "M" => :multiply, "D" => :divide_f, "I" => :divide_i }

  def run
    
    puts "Enter the first number: "
    a = gets.chomp.to_f
    puts "Enter the second number: "
    b = gets.chomp.to_f

    c = Calculator.new(a, b)

    puts "What do you want to do to these two numbers?
    A - Add (#{a.to_s} + #{b.to_s})
    S - Subtract (#{a.to_s} - #{b.to_s})
    M - Multiply (#{a.to_s} * #{b.to_s})
    D - Divide (Float) (#{a.to_s} / #{b.to_s})
    I - Divide (Integer) (#{a.to_i.to_s} / #{b.to_i.to_s})
    E - Everything (lists all results)"

    operand_input = gets.chomp
    operand = OPERAND_HASH[operand_input.upcase]

    if operand_input.upcase == "E" # special case
      puts "
    #{a.to_s} + #{b.to_s}\t=\t#{c.operate(:add).to_s}
    #{a.to_s} - #{b.to_s}\t=\t#{c.operate(:subtract).to_s}
    #{a.to_s} * #{b.to_s}\t=\t#{c.operate(:multiply).to_s}
    #{a.to_s} / #{b.to_s}\t=\t#{c.operate(:divide_f).to_s}
    #{a.to_i.to_s} / #{b.to_i.to_s}\t=\t#{c.operate(:divide_i).to_s}
    "
    else
      puts "Result: #{c.operate(operand).to_s}"
    end
  end
end

class Calculator
  # A calculator consists of two values. Simple, but true.
  def initialize(a, b)
    @a = a
    @b = b
  end

  # only takes five options as listed below
  def operate(operand)
    case operand
    when :add
      @a + @b
    when :subtract
      @a - @b
    when :multiply
      @a * @b
    when :divide_f # float divide
      "%0.2f" % (@a / (@b * 1.0)) # force float conversion, old style
    when :divide_i # integer divide
      @a.to_i / @b.to_i
    else
      "Invalid operand #{@operand.inspect} for Calculator"
    end
  end

end

m = Menu.new

while true do
  m.run
end
